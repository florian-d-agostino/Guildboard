import { apiClient } from './apiClient';
import type { Quest, QuestFilters, CreateQuestRequest } from '../types/quest';

export const questService = {

    getAll: (filters?: QuestFilters) =>
        apiClient.get<Quest[]>('/quests', { params: filters }),

    getById: (id: number) =>
        apiClient.get<Quest>(`/quests/${id}`),

    create: (data: CreateQuestRequest) =>
        apiClient.post<Quest>('/quests', data),
}