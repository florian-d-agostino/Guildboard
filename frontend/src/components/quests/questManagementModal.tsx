import React, { useState } from "react";
import type { Quest, CreateQuestRequest } from "../../types/quest";
import { questService } from "../../services/questService";
import { Modal } from "../layout/modal";
import { Button } from "../layout/button";
import { Badge, EmptyState } from "../common";
import { QuestForm } from "./questForm";

export interface QuestManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    quests: Quest[];
    onRefresh: () => Promise<void> | void;
}

export const QuestManagementModal: React.FC<QuestManagementModalProps> = ({
    isOpen,
    onClose,
    quests,
    onRefresh,
}) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleCreate = async (data: CreateQuestRequest) => {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            await questService.create(data);
            await onRefresh();
            setIsCreating(false);
        } catch (err) {
            console.error("Failed to create quest:", err);
            setErrorMessage(err instanceof Error ? err.message : "Failed to create quest");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (questId: number) => {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            await questService.delete(questId);
            await onRefresh();
        } catch (err) {
            console.error("Failed to delete quest:", err);
            setErrorMessage(err instanceof Error ? err.message : "Failed to delete quest");
        } finally {
            setIsLoading(false);
        }
    };

    const getDifficultyVariant = (diff: string) => {
        switch (diff) {
            case "EASY": return "green";
            case "MEDIUM": return "yellow";
            case "HARD": return "orange";
            case "EPIC": return "purple";
            default: return "secondary";
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
            title={isCreating ? "Create New Quest" : "Quest Management"}
            size="lg"
            footer={
                !isCreating ? (
                    <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={() => setIsCreating(true)}
                    >
                        + New Quest
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
                <QuestForm
                    onSubmit={handleCreate}
                    onCancel={() => setIsCreating(false)}
                    isLoading={isLoading}
                />
            ) : (
                <div className="flex flex-col gap-3">
                    {quests.length === 0 ? (
                        <EmptyState title="No quests found" description="Create a new quest to get started." />
                    ) : (
                        quests.map((quest) => (
                            <div
                                key={quest.id}
                                className="flex items-center justify-between p-3.5 rounded-xl bg-[#1e1c1c] border border-neutral-700/60"
                            >
                                <div className="flex flex-col gap-1 min-w-0 pr-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-bold text-white truncate text-sm">
                                            {quest.title}
                                        </span>
                                        <Badge
                                            size="sm"
                                            variant={
                                                quest.status === "AVAILABLE"
                                                    ? "green"
                                                    : quest.status === "IN_PROGRESS"
                                                    ? "yellow"
                                                    : "secondary"
                                            }
                                        >
                                            {quest.status}
                                        </Badge>
                                        <Badge size="sm" variant={getDifficultyVariant(quest.difficulty)}>
                                            {quest.difficulty}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-neutral-400 line-clamp-1">
                                        {quest.description}
                                    </p>
                                    <div className="text-[11px] text-neutral-400 flex gap-3 mt-0.5">
                                        <span>Min Lvl: <strong className="text-white">{quest.minLvl}</strong></span>
                                        <span>Reward: <strong className="text-yellow-400">{quest.goldReward}G</strong> / <strong className="text-blue-400">{quest.xpReward}XP</strong></span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <Button
                                        type="button"
                                        variant="danger"
                                        size="sm"
                                        disabled={isLoading || quest.status === "IN_PROGRESS"}
                                        onClick={() => handleDelete(quest.id)}
                                        className="text-xs py-1.5 px-2.5"
                                    >
                                        Delete
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
