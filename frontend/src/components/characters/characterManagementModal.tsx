import React, { useState } from "react";
import type { Character, CreateCharacterRequest } from "../../types/character";
import { characterService } from "../../services/characterService";
import { Modal } from "../layout/modal";
import { Button } from "../layout/button";
import { EmptyState } from "../common";
import { CharacterCard } from "./characterCard";
import { CharacterForm } from "./characterForm";

export interface CharacterManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    characters: Character[];
    onRefresh: () => Promise<void> | void;
}

export const CharacterManagementModal: React.FC<CharacterManagementModalProps> = ({
    isOpen,
    onClose,
    characters,
    onRefresh,
}) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleCreate = async (data: CreateCharacterRequest) => {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            await characterService.create(data);
            await onRefresh();
            setIsCreating(false);
        } catch (err) {
            console.error("Failed to create character:", err);
            setErrorMessage(err instanceof Error ? err.message : "Failed to create adventurer");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (characterId: number) => {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            await characterService.delete(characterId);
            await onRefresh();
        } catch (err) {
            console.error("Failed to delete character:", err);
            setErrorMessage(err instanceof Error ? err.message : "Failed to delete adventurer");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setIsCreating(false);
                setErrorMessage(null);
                onClose();
            }}
            title={isCreating ? "Recruit New Adventurer" : "Adventurers Management"}
            size="lg"
            footer={
                !isCreating ? (
                    <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={() => setIsCreating(true)}
                    >
                        + Recruit Adventurer
                    </Button>
                ) : undefined
            }
        >
            {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs">
                    {errorMessage}
                </div>
            )}

            {isCreating ? (
                <CharacterForm
                    onSubmit={handleCreate}
                    onCancel={() => setIsCreating(false)}
                    isLoading={isLoading}
                />
            ) : (
                <div className="flex flex-col gap-3">
                    {characters.length === 0 ? (
                        <EmptyState title="No adventurers found" description="Recruit new heroes to join the guild." />
                    ) : (
                        characters.map((char) => (
                            <div key={char.id} className="relative group">
                                <CharacterCard character={char} />
                                <div className="mt-1 flex justify-end">
                                    <Button
                                        type="button"
                                        variant="danger"
                                        size="sm"
                                        disabled={isLoading || char.status === "BUSY"}
                                        onClick={() => handleDelete(char.id)}
                                        className="text-xs py-1 px-2.5 opacity-80 hover:opacity-100"
                                    >
                                        Dismiss Adventurer
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </Modal>
    );
};
