export type QuestStatus = "AVAILABLE" | "IN_PROGRESS" | "COMPLETED"

export type QuestDifficulty = "EASY" | "MEDIUM" | "HARD" | "EPIC"

export interface Quest {
    id: number;
    status: QuestStatus;
    title: string;
    description: string;
    difficulty: QuestDifficulty;
    minLvl: number;
    goldReward: number;
    xpReward: number;
    slots: number;
    successRate: number;
    completionTime: number;
}

export interface QuestFilters {
    status?: QuestStatus;
    difficulty?: QuestDifficulty;
}

export interface CreateQuestRequest {
    title: string;
    description: string;
    difficulty: QuestDifficulty;
    slots: number;
}

export type UpdateQuestRequest = CreateQuestRequest;
