import { useState, useEffect } from "react";

import { Loader, ErrorAlert } from "../components/common";

import { Header } from "../components/layout/header";


import { type Quest, type QuestStatus, type QuestDifficulty } from "../types/quest";
import { type Character } from "../types/character";
import { questService } from "../services/questService";
import { characterService } from "../services/characterService";
import { QuestList } from "../components/quests/questList";
import { CharacterList } from "../components/characters/characterList";



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

    useEffect(() => {
        loadData();
    }, [statusFilter, difficultyFilter]);

    return (
        <div className="min-h-screen bg-[#1a1818] text-white p-6 md:p-10 flex flex-col gap-8">
            <Header />

            {errorMessage && (<ErrorAlert message={errorMessage} onRetry={loadData} />)}

            {isLoading ? (<Loader message="Loading guild data..." size="lg" />) :

                (<main className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start w-full max-w-7xl mx-auto">

                    {/* Character list */}
                    <div className="w-full lg:col-span-5">
                        <CharacterList characters={characters} />
                    </div>

                    {/* Quest list */}
                    <div className="w-full lg:col-span-7">
                        <QuestList
                            quests={quests}
                            statusFilter={statusFilter}
                            difficultyFilter={difficultyFilter}
                            onStatusFilterChange={setStatusFilter}
                            onDifficultyFilterChange={setDifficultyFilter}
                        />
                    </div>

                </main>)}

        </div>
    )
}

export default Guildboard; 