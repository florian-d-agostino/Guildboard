import { useState, useEffect } from "react";

import { type Quest, type QuestStatus, type QuestDifficulty } from "../types/quest";
import { type Character } from "../types/character";

import { questService } from "../services/questService";
import { characterService } from "../services/characterService";

import { QuestCard } from "../components/quests/questCard";
import { CharacterCard } from "../components/characters/characterCard";

export function Guildboard() {

    // INIT STATES
    const [quests, setQuests] = useState<Quest[]>([]);
    const [characters, setCharacters] = useState<Character[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [statusFilter, setStatusFilter] = useState<QuestStatus | "ALL">("ALL");
    const [difficultyFilter, setDifficultyFilter] = useState<QuestDifficulty | "ALL">("ALL")

    // LOAD DATA
    const loadData = async () => {
        try {
            setIsLoading(true);
            setErrorMessage(null);

            const questFilters = {
                status: statusFilter === "ALL" ? undefined : statusFilter,
                difficulty: difficultyFilter === "ALL" ? undefined : difficultyFilter
            };

            const [questData, characterData] = await Promise.all([
                questService.getAll(questFilters),
                characterService.getAll(),
            ]);

            setQuests(questData);
            setCharacters(characterData);

        } catch (error) {
            console.error("Error loading guild data", error);
            setErrorMessage("Failed to load guild data. Please try again later.");

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>

        </div>
    )
}

export default Guildboard; 