export type AssignmentCharacterRequest = {
    characterId: number;
}

export type AssignmentResponse = {
    id: number;
    characterId: number;
    questId: number;
    assignedAt: string;
    completedAt: string | null;
}