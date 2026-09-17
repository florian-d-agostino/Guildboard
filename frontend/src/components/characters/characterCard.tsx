import React, { useState } from "react";
import type { Character, CharacterHistory } from "../../types/character";
import { characterService } from "../../services/characterService";
import { CharacterAvatar } from "./characterAvatar";
import { Badge, Loader } from "../common";
import { Button } from "../layout/button";

export interface CharacterCardProps {
    character: Character;
    isSelected?: boolean;
    onLaunch?: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
    character,
    isSelected = false,
    onLaunch,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [history, setHistory] = useState<CharacterHistory[] | null>(null);
    const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);

    const maxXp = Math.max(1, character.lvl * 100);
    const xpPercent = Math.min(100, Math.round((character.xp / maxXp) * 100));

    // Toggle card expansion and lazy load quest history
    const handleToggleExpand = async () => {
        const nextState = !isExpanded;
        setIsExpanded(nextState);

        if (nextState && history === null && !isLoadingHistory) {
            try {
                setIsLoadingHistory(true);
                const historyData = await characterService.getHistory(character.id);
                setHistory(historyData);
            } catch (error) {
                console.error("Failed to load character history:", error);
                setHistory([]);
            } finally {
                setIsLoadingHistory(false);
            }
        }
    };

    return (
        <div
            draggable={character.status === "READY"}
            onDragStart={(e) => {
                e.dataTransfer.setData("characterId", character.id.toString());
            }}
            onClick={handleToggleExpand}
            className={`flex flex-col p-3.5 rounded-xl border transition-all select-none cursor-pointer ${
                isSelected
                    ? "bg-[#F6E400] text-black border-yellow-500 shadow-md"
                    : "bg-[#282525] text-white border-neutral-800 hover:border-neutral-700 hover:shadow-lg"
            } ${character.status === "READY" ? "cursor-grab active:cursor-grabbing" : ""}`}
        >
            {/* Header row: Avatar, Info, Gold, Launch Button */}
            <div className="flex items-center justify-between gap-3">
                {/* Left: Avatar + Details */}
                <div className="flex items-center gap-3">
                    <CharacterAvatar
                        alt={character.name}
                        level={character.lvl}
                        xp={character.xp}
                        size={64}
                    />

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                            <Badge variant="light">
                                {character.name}
                                <img
                                    src={`/${character.gender}.png`}
                                    alt={character.gender}
                                    className="w-4 h-4 inline-block ml-1.5 object-contain"
                                />
                            </Badge>
                            <Badge variant="secondary" size="sm">
                                {character.characterClass}
                            </Badge>
                        </div>

                        <Badge variant="dark" size="sm" className="text-neutral-300">
                            {character.completedQuest} / {character.totalQuest} Quests
                        </Badge>
                    </div>
                </div>

                {/* Right: Gold + Action button */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-neutral-300 text-neutral-900 rounded font-bold text-xs shadow-inner">
                        <span>{character.wallet}</span>
                        <span className="text-[10px]">Gold</span>
                    </div>

                    {character.status === "READY" ? (
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onLaunch?.(character);
                            }}
                        >
                            LAUNCH QUEST
                        </Button>
                    ) : (
                        <Badge variant="dark">BUSY</Badge>
                    )}
                </div>
            </div>

            {/* Expanded Accordion: Details & History */}
            {isExpanded && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 pt-3 border-t border-neutral-700/80 flex flex-col gap-3 text-xs text-neutral-300 cursor-default"
                >
                    {/* XP Progress detail */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
                            <span>Level {character.lvl} Progress</span>
                            <span className="text-emerald-400 font-bold">
                                {character.xp} / {maxXp} XP ({xpPercent}%)
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
                            <div
                                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                style={{ width: `${xpPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Quest History Section */}
                    <div className="flex flex-col gap-1.5 mt-1">
                        <h4 className="font-bold text-neutral-200 flex items-center gap-1.5">
                            Quest History
                        </h4>

                        {isLoadingHistory ? (
                            <div className="py-2 flex justify-center">
                                <Loader size="sm" message="Loading history..." />
                            </div>
                        ) : !history || history.length === 0 ? (
                            <p className="text-[11px] text-neutral-500 italic">
                                No completed quests yet.
                            </p>
                        ) : (
                            <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
                                {history.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-2 bg-neutral-800/60 rounded-lg border border-neutral-700/50"
                                    >
                                        <span className="font-semibold text-neutral-200">
                                            {item.questTitle}
                                        </span>
                                        <Badge
                                            variant={item.completedAt ? "green" : "orange"}
                                            size="sm"
                                        >
                                            {item.completedAt ? "COMPLETED" : "ON GOING"}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
