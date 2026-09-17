import React, {useState } from "react";
import type { Character, CreateCharacterRequest, CharacterGender, CharacterClass} from "../../types/character";
import { Button } from "../layout/button";


export interface CharacterFormProps {
    initialData?: Character | null;
    onSubmit: (data: CreateCharacterRequest) => void |Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}


    const [name, setName] = useState(initialData?.name || "");
    const [gender, setGender] = useState(initialData?.gender || "MALE");
    const [characterClass, setCharacterClass] = useState(initialData?.class || "WARRIOR");
    const [level, setLevel] = useState(initialData?.level || 1);

