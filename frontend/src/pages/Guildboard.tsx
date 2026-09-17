import { useState, useEffect } from "react";

import { Loader, ErrorAlert } from "../components/common";

import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";


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

    const [mobileTab, setMobileTab] = useState<"quests" | "characters">("quests");

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

    // ASSIGN CHARACTER TO QUEST (HANDLES 422 BUSINESS ERRORS)
    const handleAssignQuest = async (questId: number, characterId: number) => {
        try {
            setErrorMessage(null);
            await questService.assign(questId, { characterId });
            await loadData();
        } catch (error: unknown) {
            console.error("Assign quest failed:", error);
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Failed to assign adventurer to this quest.");
            }
        }
    };

    // COMPLETE QUEST / CLAIM REWARD
    const handleCompleteQuest = async (quest: Quest) => {
        try {
            setErrorMessage(null);
            await questService.complete(quest.id);
            await loadData();
        } catch (error: unknown) {
            console.error("Complete quest failed:", error);
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Failed to complete quest.");
            }
        }
    };

    useEffect(() => {
        loadData();
    }, [statusFilter, difficultyFilter]);

    return (
        <div className="min-h-screen bg-[#1a1818] text-white p-4 sm:p-6 md:p-10 pb-24 lg:pb-10 flex flex-col gap-8">
            <Header />

            {errorMessage && (<ErrorAlert message={errorMessage} onRetry={loadData} />)}

            {isLoading ? (<Loader message="Loading guild data..." size="lg" />) :

                (<main className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start w-full max-w-7xl mx-auto">

                    {/* Character list : always visible on desktop, tab-controlled on mobile */}
                    <div className={`w-full lg:col-span-5 ${mobileTab === "characters" ? "block" : "hidden lg:block"}`}>
                        <CharacterList characters={characters} />
                    </div>

                    {/* Quest list : always visible on desktop, tab-controlled on mobile */}
                    <div className={`w-full lg:col-span-7 ${mobileTab === "quests" ? "block" : "hidden lg:block"}`}>
                        <QuestList
                            quests={quests}
                            statusFilter={statusFilter}
                            difficultyFilter={difficultyFilter}
                            availableCharacters={characters}
                            onStatusFilterChange={setStatusFilter}
                            onDifficultyFilterChange={setDifficultyFilter}
                            onAssignQuest={handleAssignQuest}
                            onCompleteQuest={handleCompleteQuest}
                        />
                    </div>

                </main>)}

            {/* Bottom Navigation Footer on Mobile */}
            <Footer
                onOpenQuests={() => setMobileTab("quests")}
                onOpenCharacters={() => setMobileTab("characters")}
                className="lg:hidden fixed bottom-0 left-0 right-0 z-30 shadow-2xl"
            />
        </div>
    );
}

export default Guildboard; 