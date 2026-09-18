import React, { useEffect, useState } from "react";
import type { Character, CreateCharacterRequest, CharacterGender, CharacterClass } from "../../types/character";
import { Button } from "../layout/button";

export interface CharacterFormProps {
    initialData?: Character | null;
    onSubmit: (data: CreateCharacterRequest) => void | Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}

export const CharacterForm: React.FC<CharacterFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
}) => {
    const [name, setName] = useState(initialData?.name || "");
    const [gender, setGender] = useState<CharacterGender>(initialData?.gender || "MAN");
    const [characterClass, setCharacterClass] = useState<CharacterClass>(initialData?.characterClass || "WARRIOR");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setGender(initialData.gender);
            setCharacterClass(initialData.characterClass);
        } else {
            setName("");
            setGender("MAN");
            setCharacterClass("WARRIOR");
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            gender,
            characterClass,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
            {/* Name */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Character Name
                </label>
                <input
                    type="text"
                    required
                    minLength={2}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Grimbold"
                    className="w-full bg-[#1a1818] border border-neutral-700 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                />
            </div>

            {/* Gender */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Gender
                </label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as CharacterGender)}
                    className="w-full bg-[#1a1818] border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer"
                >
                    <option value="MAN">Man</option>
                    <option value="WOMAN">Woman</option>
                </select>
            </div>

            {/* Class */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Class
                </label>
                <select
                    value={characterClass}
                    onChange={(e) => setCharacterClass(e.target.value as CharacterClass)}
                    className="w-full bg-[#1a1818] border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer"
                >
                    <option value="WARRIOR">Warrior</option>
                    <option value="MAGE">Mage</option>
                    <option value="ARCHER">Archer</option>
                    <option value="HEALER">Healer</option>
                    <option value="ROGUE">Rogue</option>
                    <option value="ADVENTURER">Adventurer</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-neutral-800">
                {onCancel && (
                    <Button
                        type="button"
                        variant="secondary"
                        size="md"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : initialData ? "Save changes" : "Recruit"}
                </Button>
            </div>
        </form>
    );
};
