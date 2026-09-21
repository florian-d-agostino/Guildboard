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
    const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
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
            setErrorMessage(err instanceof Error ? err.message : "Failed to create character");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (data: CreateCharacterRequest) => {
        if (!editingCharacter) return;
        try {
            setIsLoading(true);
            setErrorMessage(null);
            await characterService.update(editingCharacter.id, data);
            await onRefresh();
            setEditingCharacter(null);
        } catch (err) {
            console.error("Failed to update character:", err);
            setErrorMessage(err instanceof Error ? err.message : "Failed to update character");
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
            setErrorMessage(err instanceof Error ? err.message : "Failed to delete character");
        } finally {
            setIsLoading(false);
        }
    };

    const isFormOpen = isCreating || editingCharacter !== null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setIsCreating(false);
                setEditingCharacter(null);
                setErrorMessage(null);
                onClose();
            }}
            title={
                editingCharacter
                    ? "Edit Character"
                    : isCreating
                    ? "Recruit New Character"
                    : "Characters Management"
            }
            size="lg"
            footer={
                !isFormOpen ? (
                    <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={() => setIsCreating(true)}
                    >
                        + Recruit Character
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
            ) : editingCharacter ? (
                <CharacterForm
                    initialData={editingCharacter}
                    onSubmit={handleUpdate}
                    onCancel={() => setEditingCharacter(null)}
                    isLoading={isLoading}
                />
            ) : (
                <div className="flex flex-col gap-3">
                    {characters.length === 0 ? (
                        <EmptyState title="No characters found" description="Recruit new heroes to join the guild." />
                    ) : (
                        characters.map((char) => (
                            <div key={char.id} className="relative group">
                                <CharacterCard character={char} />
                                <div className="mt-1 flex justify-end items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        disabled={isLoading || char.status === "BUSY"}
                                        title={char.status === "BUSY" ? "Cannot edit a busy character" : "Edit character"}
                                        onClick={() => setEditingCharacter(char)}
                                        className="text-xs py-1 px-2.5 font-semibold"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="danger"
                                        size="sm"
                                        disabled={isLoading || char.status === "BUSY"}
                                        title={
                                            char.status === "BUSY"
                                                ? "Cannot dismiss a character on a quest"
                                                : "Dismiss character"
                                        }
                                        onClick={() => {
                                            if (window.confirm(`Are you sure you want to dismiss ${char.name}? This action will permanently remove them from the guild.`)) {
                                                handleDelete(char.id);
                                            }
                                        }}
                                        className="text-xs py-1 px-2.5 opacity-80 hover:opacity-100 font-semibold"
                                    >
                                        Dismiss Character
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
