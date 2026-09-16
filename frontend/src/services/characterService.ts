import { apiClient } from "./apiClient";
import { type CharacterHistory, type Character, type CreateCharacterRequest, type UpdateCharacterRequest } from "../types/character";

export const characterService = {

    getAll: () =>
        apiClient.get<Character[]>(`/characters`),

    getById: (id: number) =>
        apiClient.get<Character>(`/characters/${id}`),

    getHistory: (id: number) =>
        apiClient.get<CharacterHistory[]>(`/characters/${id}/history`),

    create: (data: CreateCharacterRequest) =>
        apiClient.post<Character>(`/characters`, data),

    update: (id: number, data: UpdateCharacterRequest) =>
        apiClient.patch<Character>(`/characters/${id}`, data),

    delete: (id: number) =>
        apiClient.delete<void>(`/characters/${id}`)


}