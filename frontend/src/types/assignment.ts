export interface AssignmentCharacterRequest {
    characterId: number;
}

export interface AssignmentResponse {
    id: number;
    characterId: number;
    questId: number;
    assignedAt: string;
    completedAt: string | null;
}