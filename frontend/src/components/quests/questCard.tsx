import React, { useState } from "react";
import type { Quest } from "../../types/quest";
import { Badge } from "../common";
import { LevelBadge } from "../characters";
import { Button } from "../layout/button";
import { QuestProgressBar } from "./questProgressBar";





const difficultyBadge = {
    EASY: "green" as const,
    MEDIUM: "yellow" as const,
    HARD: "red" as const,
    EPIC: "purple" as const,
}


export interface QuestCardProps {
    quest: Quest;
    isSelected?: boolean;
    onSelect?: (quest: Quest) => void;
    onComplete?: (quest: Quest) => void;
}


// BG
export const QuestCard: React.FC<QuestCardProps> = ({
    quest,
    isSelected = false,
    onSelect,
    onComplete,
}) => {
    const [isReadyToClaim, setIsReadyToClaim] = useState<boolean>(false);

    return (



        // Box
        <div
            onClick={() => onSelect?.(quest)}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                quest.status === "IN_PROGRESS" && !isReadyToClaim ? "opacity-75 grayscale-[30%]" : ""
            } ${
                isSelected
                    ? "bg-guild-primary text-white border-guild-secondary shadow-md"
                    : "bg-guild-dark text-white border-neutral-800 hover:border-neutral-700"
            }`}
        >



            {/* Left Box*/}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                    <LevelBadge level={quest.minLvl} />
                    <span className="text-[10px]">Min</span>
                </div>
                <Badge variant="light" className="text-base px-4 py-1.5 font-bold">
                    {quest.title}
                </Badge>
            </div>



            {/* Center Box : Progress bar when IN_PROGRESS, normal details otherwise */}
            {quest.status === "IN_PROGRESS" && !isReadyToClaim ? (
                <div className="flex-1 max-w-xs mx-4">
                    <QuestProgressBar
                        totalDurationSeconds={quest.completionTime}
                        onFinish={() => setIsReadyToClaim(true)}
                    />
                </div>
            ) : (
                <div className="flex items-center gap-4 text-sm">
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
                        {quest.slots} slot{quest.slots > 1 ? "s" : ""}
                    </span>
                </div>
            )}



            {/* Right Box */}
            <div className="flex items-center gap-3 min-w-[120px] justify-end">
                {quest.status === "IN_PROGRESS" && (
                    !isReadyToClaim ? (
                        <Badge variant="orange" size="sm" className="animate-pulse">
                            ON GOING
                        </Badge>
                    ) : (
                        <Button
                            variant="danger"
                            size="sm"
                            className="animate-pulse shadow-lg shadow-amber-500/40 font-bold bg-amber-500 hover:bg-amber-600 text-neutral-950"
                            onClick={(e) => {
                                e.stopPropagation();
                                onComplete?.(quest);
                            }}
                        >
                            CLAIM REWARD
                        </Button>
                    )
                )}

                {quest.status === "AVAILABLE" && (
                    <Badge variant="green" size="sm">AVAILABLE</Badge>
                )}

                {quest.status === "COMPLETED" && (
                    <Badge variant="dark" size="sm">COMPLETED</Badge>
                )}
            </div>
        </div>
    );
};
