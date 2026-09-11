
// ENUMS
export type CharacterClass = "ADVENTURER" | "WARRIOR" | "MAGE" | "ARCHER" | "HEALER" | "ROGUE";

export type CharacterGender = "MAN" | "WOMAN"

export type CharacterStatus = "READY" | "BUSY"


// CHARACTER
export interface Character {
    id: number;
    status: CharacterStatus;
    name: string;
    gender: CharacterGender;
    characterClass: CharacterClass; // backend notation. "class" already used by springboot
    lvl: number;
    xp: number;
    wallet: number;
    completedQuest: number;
    totalQuest: number;

}

// CREATE CHARACTER
export interface CreateCharacterRequest {
    name: string;
    gender: CharacterGender;
    characterClass: CharacterClass;
}

// CHARACTER HISTORY
export interface CharacterHistory {
    id: number;
    questTitle: string;
    assignedAt: string;
    completedAt: string | null;
}

export type UpdateCharacterRequest = CreateCharacterRequest;