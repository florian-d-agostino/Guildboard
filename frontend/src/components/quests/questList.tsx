import React from "react";
import type { Quest, QuestStatus, QuestDifficulty } from "../../types/quest";
import { QuestCard } from "./questCard";
import { EmptyState } from "../common";
import { Box } from "../layout/box";

export type QuestListProps = {
    quests: Quest[];
    statusFilter: QuestStatus | "ALL";
    difficultyFilter: QuestDifficulty | "ALL";
    onStatusFilterChange: (status: QuestStatus | "ALL") => void;
    onDifficultyFilterChange: (difficulty: QuestDifficulty | "ALL") => void;
    selectedQuestId?: number | null;
    onSelectQuest?: (quest: Quest) => void;
    onCompleteQuest?: (quest: Quest) => void;
};

export const QuestList: React.FC<QuestListProps> = ({
    quests,
    statusFilter,
    difficultyFilter,
    onStatusFilterChange,
    onDifficultyFilterChange,
    selectedQuestId,
    onSelectQuest,
    onCompleteQuest,
}) => {
    return (
        <Box
            title={
                <div className="flex items-center gap-2">
                    <span>Quests</span>
                    <span className="text-xs bg-neutral-700 text-neutral-300 px-2 py-0.5 rounded-full font-semibold">
                        {quests.length}
                    </span>
                </div>
            }
            action={
                <div className="flex items-center gap-2">
                    {/* Status filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange(e.target.value as QuestStatus | "ALL")}
                        className="bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-red-500 cursor-pointer"
                    >
                        <option value="ALL">All Status</option>
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                    </select>

                    {/* Difficulty filter */}
                    <select
                        value={difficultyFilter}
                        onChange={(e) => onDifficultyFilterChange(e.target.value as QuestDifficulty | "ALL")}
                        className="bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-red-500 cursor-pointer"
                    >
                        <option value="ALL">All Difficulties</option>
                        <option value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
                        <option value="EPIC">EPIC</option>
                    </select>
                </div>
            }
        >
            {/* Quests list or empty state */}
            {quests.length === 0 ? (
                <EmptyState
                    title="No quests found"
                    description="No quests match your current filters. Try changing filters or create a new quest!"
                />
            ) : (
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[65vh] pr-1">
                    {quests.map((quest) => (
                        <QuestCard
                            key={quest.id}
                            quest={quest}
                            isSelected={selectedQuestId === quest.id}
                            onSelect={onSelectQuest}
                            onComplete={onCompleteQuest}
                        />
                    ))}
                </div>
            )}
        </Box>
    );
};

export default QuestList;
