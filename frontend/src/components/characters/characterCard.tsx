import React from "react";
import type { Character } from "../../types/character";
import { CharacterAvatar, Badge } from "../common";
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
    return (
        // Main container
        <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
            isSelected 
                ? "bg-[#F6E400] text-black border-yellow-500 shadow-md" 
                : "bg-[#282525] text-white border-neutral-800 hover:border-neutral-700"
        }`}>

            {/* Left: Avatar + Details */}
            <div className="flex items-center gap-3">
                {/* Character Avatar with XP ring & Level badge */}
                <CharacterAvatar 
                    alt={character.name}
                    level={character.lvl}
                    xp={character.xp}
                    size={64}
                />

                {/* Name & gender & completed quests */}
                <div className="flex flex-col gap-1.5">
                    {/* Name & gender */}
                    <Badge variant="light">
                        {character.name}
                        <img 
                            src={`/${character.gender}.png`} 
                            alt={character.gender} 
                            className="w-4 h-4 inline-block ml-1.5 object-contain"
                        />
                    </Badge>

                    {/* Completed quests */}
                    <Badge variant="secondary" size="sm">
                        {character.completedQuest} Quests Completed
                    </Badge>
                </div>
            </div>

            {/* Right: Gold + Action button */}
            <div className="flex items-center gap-3">
                {/* Gold */}
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-neutral-300 text-neutral-900 rounded font-bold text-xs shadow-inner">
                    <span>{character.wallet}</span>
                    <span className="text-[10px]">Gold</span>
                </div>

                {/* Launch quest or busy */}
                {character.status === "READY" ? (
                    <Button variant="danger" size="sm" onClick={() => onLaunch?.(character)}>
                        LAUNCH QUEST
                    </Button>
                ) : (
                    <Badge variant="dark">BUSY</Badge>
                )}
            </div>
        </div>
    );
};
