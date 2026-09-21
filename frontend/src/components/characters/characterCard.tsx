import React, { useState } from "react";
import type { Character, CharacterHistory } from "../../types/character";
import { characterService } from "../../services/characterService";
import { CharacterAvatar } from "./characterAvatar";
import { Badge, Loader } from "../common";

export interface CharacterCardProps {
    character: Character;
    isSelected?: boolean;
    onLaunch?: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
    character,
    isSelected = false,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [history, setHistory] = useState<CharacterHistory[] | null>(null);
    const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);

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

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("characterId", character.id.toString());
        e.dataTransfer.effectAllowed = "move";

        // Clean solid drag preview without browser semi-transparency
        const dragPreview = document.createElement("div");
        dragPreview.style.position = "fixed";
        dragPreview.style.top = "-9999px";
        dragPreview.style.left = "-9999px";
        dragPreview.style.padding = "8px 14px";
        dragPreview.style.borderRadius = "10px";
        dragPreview.style.backgroundColor = "#282525";
        dragPreview.style.color = "#ffffff";
        dragPreview.style.border = "2px solid #eab308";
        dragPreview.style.fontWeight = "bold";
        dragPreview.style.fontSize = "13px";
        dragPreview.style.boxShadow = "0 8px 20px rgba(0,0,0,0.8)";
        dragPreview.style.zIndex = "99999";
        dragPreview.style.pointerEvents = "none";
        dragPreview.innerText = `⚔️ ${character.name} (Lvl ${character.lvl} ${character.characterClass})`;
        document.body.appendChild(dragPreview);

        e.dataTransfer.setDragImage(dragPreview, 25, 20);

        setTimeout(() => {
            if (document.body.contains(dragPreview)) {
                document.body.removeChild(dragPreview);
            }
            // Disappear from characters list while dragging
            setIsDragging(true);
        }, 0);
    };

    const handleDragEnd = () => {
        // Reappear when drop is finished or cancelled
        setIsDragging(false);
    };

    if (isDragging) {
        // Completely invisible / collapsed while being dragged
        return (
            <div
                onDragEnd={handleDragEnd}
                className="opacity-0 h-0 p-0 m-0 border-0 pointer-events-none overflow-hidden"
            />
        );
    }

    return (
        <div
            draggable={character.status === "READY"}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleToggleExpand}
            className={`flex flex-col p-3.5 rounded-xl border transition-all select-none cursor-pointer ${
                isSelected
                    ? "bg-[#F6E400] text-black border-yellow-500 shadow-md"
                    : "bg-[#282525] text-white border-neutral-800 hover:border-neutral-700 hover:shadow-lg"
            } ${character.status === "READY" ? "cursor-grab active:cursor-grabbing" : ""}`}
        >
            {/* Header row: Avatar, Info, Gold, Status Badge */}
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

                {/* Right: Gold + Status badge */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-neutral-300 text-neutral-900 rounded font-bold text-xs shadow-inner">
                        <span>{character.wallet}</span>
                        <span className="text-[10px]">Gold</span>
                    </div>

                    <Badge variant={character.status === "READY" ? "green" : "dark"} size="sm">
                        {character.status}
                    </Badge>
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
                                {history.map((item) => {
                                    const isFailed = item.questStatus === "FAILED";
                                    const isCompleted = item.completedAt !== null && !isFailed;
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-2 bg-neutral-800/60 rounded-lg border border-neutral-700/50"
                                        >
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-semibold text-neutral-200">
                                                    {item.questTitle}
                                                </span>
                                                {isCompleted && (
                                                    <div className="flex items-center gap-2 text-[10px]">
                                                        <span className="text-yellow-400 font-bold">
                                                            +{item.goldReward ?? 0} Gold
                                                        </span>
                                                        <span className="text-blue-400 font-bold">
                                                            +{item.xpReward ?? 0} XP
                                                        </span>
                                                    </div>
                                                )}
                                                {isFailed && (
                                                    <div className="text-[10px] text-red-400 font-medium">
                                                        No rewards (Quest failed)
                                                    </div>
                                                )}
                                            </div>
                                            <Badge
                                                variant={isFailed ? "red" : item.completedAt ? "green" : "orange"}
                                                size="sm"
                                            >
                                                {isFailed ? "FAILED" : item.completedAt ? "COMPLETED" : "ON GOING"}
                                            </Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
