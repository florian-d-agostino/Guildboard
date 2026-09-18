export type QuestStatus = "AVAILABLE" | "IN_PROGRESS" | "COMPLETED" | "FAILED";

export type QuestDifficulty = "EASY" | "MEDIUM" | "HARD" | "EPIC"

export type Quest = {
    id: number;
    status: QuestStatus;
    title: string;
    description: string;
    difficulty: QuestDifficulty;
    minLvl: number;
    goldReward: number;
    xpReward: number;
    slots: number;
    assignedSlots?: number;
    successRate: number;
    completionTime: number;
}

export type QuestFilters = {
    status?: QuestStatus;
    difficulty?: QuestDifficulty;
}

export type CreateQuestRequest = {
    title: string;
    description: string;
    difficulty: QuestDifficulty;
    slots: number;
}

export type UpdateQuestRequest = CreateQuestRequest;
