import React from "react";
import type { Character } from "../../types/character";
import { CharacterCard } from "./characterCard";
import { EmptyState } from "../common";
import { Box } from "../layout/box";

export type CharacterListProps = {
    characters: Character[];
    selectedCharacterId?: number | null;
    onLaunch?: (character: Character) => void;
    onSelectCharacter?: (character: Character) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({
    characters,
    selectedCharacterId,
    onLaunch,
    onSelectCharacter,
}) => {
    return (
        <Box
            title={
                <div className="flex items-center gap-2">
                    <span> Characters</span>
                    <span className="text-xs bg-neutral-700 text-neutral-300 px-2 py-0.5 rounded-full font-semibold">
                        {characters.length}
                    </span>
                </div>
            }
        >
            {characters.length === 0 ? (
                <EmptyState
                    title="No characters"
                    description="Your guild has no characters yet. Create your first one!"
                />
            ) : (
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[65vh] pr-1">
                    {characters.map((character) => (
                        <div
                            key={character.id}
                            onClick={() => onSelectCharacter?.(character)}
                            className="cursor-pointer transition-transform hover:-translate-y-0.5"
                        >
                            <CharacterCard
                                character={character}
                                isSelected={selectedCharacterId === character.id}
                                onLaunch={onLaunch}
                            />
                        </div>
                    ))}
                </div>
            )
            }
        </Box >
    );
};

export default CharacterList