import React from "react";
import type { Quest } from "../../types/quest";
import { Badge, LevelBadge } from "../common";
import { Button } from "../layout/button";





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
    return (



        // Box
        <div 
            onClick={() => onSelect?.(quest)}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
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



            {/* Center Box */}
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



            {/* Right Box */}
            <div className="flex items-center gap-2">
                {quest.status === "IN_PROGRESS" && (
                    <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onComplete?.(quest);
                        }}
                    >
                        COMPLETE
                    </Button>
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
