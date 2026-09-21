import React, { useState } from "react";
import type { Quest } from "../../types/quest";
import type { Character } from "../../types/character";
import { Badge } from "../common";
import { LevelBadge, CharacterAvatar } from "../characters";
import { Button } from "../layout/button";
import { QuestProgressBar } from "./questProgressBar";

const difficultyBadge = {
    EASY: "green" as const,
    MEDIUM: "yellow" as const,
    HARD: "red" as const,
    EPIC: "purple" as const,
};

export interface QuestCardProps {
    quest: Quest;
    isSelected?: boolean;
    availableCharacters?: Character[];
    onSelect?: (quest: Quest) => void;
    onComplete?: (quest: Quest) => void;
    onAssign?: (questId: number, characterId: number) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({
    quest,
    isSelected = false,
    availableCharacters = [],
    onSelect,
    onComplete,
    onAssign,
}) => {
    const [isReadyToClaim, setIsReadyToClaim] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const isAvailable = quest.status === "AVAILABLE";
    const readyCharacters = availableCharacters.filter((c) => c.status === "READY");

    const handleCardClick = () => {
        onSelect?.(quest);
        // Unfold accordion on mobile devices to show description (and heroes if available)
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
            setIsExpanded((prev) => !prev);
        }
    };

    return (
        <div
            onClick={handleCardClick}
            onDragOver={(e) => {
                if (isAvailable) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                    setIsDragOver(true);
                }
            }}
            onDragEnter={(e) => {
                if (isAvailable) {
                    e.preventDefault();
                    setIsDragOver(true);
                }
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                if (isAvailable) {
                    const charId = Number(e.dataTransfer.getData("characterId"));
                    if (charId) {
                        onAssign?.(quest.id, charId);
                    }
                }
            }}
            className={`flex flex-col p-3 rounded-xl border transition-all select-none ${
                isAvailable ? "cursor-pointer lg:cursor-default" : ""
            } ${
                isDragOver
                    ? "border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-500/50 scale-[1.01]"
                    : quest.status === "COMPLETED"
                    ? "opacity-60 bg-[#141313] text-neutral-400 border-neutral-800"
                    : quest.status === "FAILED"
                    ? "opacity-75 bg-[#181212] text-neutral-400 border-red-950/80"
                    : quest.status === "IN_PROGRESS" && !isReadyToClaim
                    ? "opacity-85"
                    : isSelected
                    ? "bg-guild-primary text-white border-guild-secondary shadow-md"
                    : "bg-guild-dark text-white border-neutral-800 hover:border-neutral-700"
            }`}
        >
            {/* Top row : Left info, Center (rewards or progress), Right status */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 w-full">
                {/* Left Box */}
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="flex items-center gap-1 text-xs text-neutral-400 shrink-0">
                        <LevelBadge level={quest.minLvl} />
                        <span className="text-[10px]">Min</span>
                    </div>
                    <Badge variant="light" className="text-sm sm:text-base px-3 sm:px-4 py-1.5 font-bold truncate">
                        {quest.title}
                    </Badge>
                </div>

                {/* Center Box : Progress bar when IN_PROGRESS, normal details otherwise */}
                {quest.status === "IN_PROGRESS" && !isReadyToClaim ? (
                    <div className="flex-1 max-w-xs mx-1 sm:mx-4 w-full sm:w-auto">
                        <QuestProgressBar
                            totalDurationSeconds={quest.completionTime}
                            onFinish={() => setIsReadyToClaim(true)}
                        />
                    </div>
                ) : quest.status === "FAILED" ? (
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap text-neutral-500">
                        <span className="line-through flex items-center gap-1">
                            +{quest.goldReward} Gold
                        </span>
                        <span className="line-through flex items-center gap-1">
                            +{quest.xpReward} XP
                        </span>
                        <Badge variant={difficultyBadge[quest.difficulty]} size="sm">
                            {quest.difficulty}
                        </Badge>
                        <span className="text-red-400 text-xs font-semibold">
                            (Failed)
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap">
                        <span className="font-bold text-yellow-400 flex items-center gap-1">
                            Gold + {quest.goldReward}
                        </span>
                        <span className="font-bold text-emerald-400 flex items-center gap-1">
                            {quest.xpReward} XP
                        </span>
                        <Badge variant={difficultyBadge[quest.difficulty]} size="sm">
                            {quest.difficulty}
                        </Badge>
                        <span className="text-xs text-neutral-400">
                            {quest.assignedSlots ?? 0} / {quest.slots} slot{quest.slots > 1 ? "s" : ""}
                        </span>
                    </div>
                )}

                {/* Right Box */}
                <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
                    {quest.status === "IN_PROGRESS" && (
                        !isReadyToClaim ? (
                            <Badge variant="orange" size="sm" className="animate-pulse">
                                ON GOING
                            </Badge>
                        ) : (
                            <Button
                                type="button"
                                variant="primary"
                                size="sm"
                                className="font-bold text-xs px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-900 border-none rounded-lg"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onComplete?.(quest);
                                }}
                            >
                                Claim Reward
                            </Button>
                        )
                    )}

                    {isAvailable && (
                        (quest.assignedSlots ?? 0) > 0 ? (
                            <Badge variant="yellow" size="sm">
                                {isDragOver ? "DROP HERE" : `WAITING (${quest.assignedSlots}/${quest.slots})`}
                            </Badge>
                        ) : (
                            <Badge variant="green" size="sm">
                                {isDragOver ? "DROP HERE" : "AVAILABLE"}
                            </Badge>
                        )
                    )}

                    {quest.status === "COMPLETED" && (
                        <Badge variant="dark" size="sm">COMPLETED</Badge>
                    )}

                    {quest.status === "FAILED" && (
                        <Badge variant="red" size="sm">FAILED</Badge>
                    )}
                </div>
            </div>

            {/* Quest Description: always on web (lg:block), conditionally on mobile when expanded */}
            {quest.description && (
                <div
                    className={`text-xs text-neutral-300 leading-relaxed mt-2.5 pt-2 border-t border-neutral-800/80 ${
                        isExpanded ? "block" : "hidden lg:block"
                    }`}
                >
                    <p className="line-clamp-2 lg:line-clamp-3 italic text-neutral-400">
                        "{quest.description}"
                    </p>
                </div>
            )}

            {/* Mobile / Accordion view ONLY : Assign character list under the quest */}
            {isAvailable && isExpanded && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="lg:hidden mt-3 pt-3 border-t border-neutral-700/60 flex flex-col gap-2 cursor-default"
                >
                    <div className="flex items-center justify-between text-xs text-neutral-300">
                        <span className="font-semibold text-neutral-200">
                            Choose a character to assign:
                        </span>
                        <span className="text-[11px] text-neutral-400">
                            (Min level: {quest.minLvl})
                        </span>
                    </div>

                    {readyCharacters.length === 0 ? (
                        <p className="text-xs text-neutral-500 italic py-1">
                            No characters are currently READY. Wait for an expedition to finish or recruit one!
                        </p>
                    ) : (
                        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                            {readyCharacters.map((character) => {
                                const isEligible = character.lvl >= quest.minLvl;
                                return (
                                    <div
                                        key={character.id}
                                        onClick={() => {
                                            if (isEligible) {
                                                onAssign?.(quest.id, character.id);
                                            }
                                        }}
                                        className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                                            isEligible
                                                ? "bg-neutral-800/80 hover:bg-neutral-700/80 border-neutral-700 hover:border-neutral-600 cursor-pointer"
                                                : "bg-neutral-900/60 border-neutral-800 opacity-50 cursor-not-allowed"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <CharacterAvatar
                                                alt={character.name}
                                                level={character.lvl}
                                                xp={character.xp}
                                                size={36}
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-white">
                                                    {character.name}
                                                </span>
                                                <span className="text-[10px] text-neutral-400">
                                                    Lvl {character.lvl} • {character.characterClass}
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            variant={isEligible ? "primary" : "secondary"}
                                            size="sm"
                                            disabled={!isEligible}
                                            className="text-xs px-3 py-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isEligible) {
                                                    onAssign?.(quest.id, character.id);
                                                }
                                            }}
                                        >
                                            {isEligible ? "Assign" : "Lvl too low"}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
