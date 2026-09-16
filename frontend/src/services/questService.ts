import { apiClient } from './apiClient';
import type { Quest, QuestFilters, CreateQuestRequest, UpdateQuestRequest } from '../types/quest';
import type { AssignmentCharacterRequest, AssignmentResponse } from '../types/assignment';

export const questService = {

    getAll: (filters?: QuestFilters) =>
        apiClient.get<Quest[]>('/quests', { params: filters }),

    getById: (id: number) =>
        apiClient.get<Quest>(`/quests/${id}`),

    create: (data: CreateQuestRequest) =>
        apiClient.post<Quest>('/quests', data),

    update: (id: number, data: UpdateQuestRequest) =>
        apiClient.patch<Quest>(`/quests/${id}`, data),

    delete: (id: number) =>
        apiClient.delete<void>(`/quests/${id}`),

    assign: (questId: number, data: AssignmentCharacterRequest) =>
        apiClient.post<AssignmentResponse>(`/quests/${questId}/assignment`, data),

    complete: (questId: number) =>
        apiClient.post<Quest>(`/quests/${questId}/completion`)
}