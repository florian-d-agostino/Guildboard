import React, { useEffect, useState } from "react";
import type { Quest, CreateQuestRequest, QuestDifficulty } from "../../types/quest";
import { Button } from "../layout/button";



export interface QuestFormProps {
    initialData?: Quest | null;
    onSubmit: (data: CreateQuestRequest) => void |Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}




export const QuestForm: React.FC<QuestFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
    isLoading= false,
    
}) => {


    // States
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [difficulty, setDifficulty] = useState<QuestDifficulty>(initialData?.difficulty || "EASY");
    const [slots, setSlots] = useState<number>(initialData?.slots || 1);



    // IF change state
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setDifficulty(initialData.difficulty);
            setSlots(initialData.slots);
        } else {
            setTitle("");
            setDescription("");
            setDifficulty("EASY");
            setSlots(1);
        }
    }, [initialData]);


    // Handle
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            title,
            description,
            difficulty,
            slots: Number(slots),
        });
    };
        return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">

            {/* Title Quest */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Quest Title
                </label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                    placeholder="Title..."

                    className="w-full bg-[#1a1818] border border-neutral-700 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                />
            </div>


            {/* Describe */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Description
                </label>
                <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                    placeholder="Describe the quest..."

                    className="w-full bg-[#1a1818] border border-neutral-700 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors resize-none"
                />
            </div>


            {/* Difficulty */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Difficulty
                    </label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as QuestDifficulty)}
                        className="w-full bg-[#1a1818] border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer"
                    >
                        <option value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
                        <option value="EPIC">EPIC</option>
                    </select>
                </div>


                {/* Slots */}
                <div className="w-28">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Slots
                    </label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        required
                        value={slots}
                        onChange={(e) => setSlots(Number(e.target.value))}
                        className="w-full bg-[#1a1818] border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-neutral-400 transition-colors"
                    />
                </div>
            </div>


            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3">
                {onCancel && (
                    <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" variant="danger" disabled={isLoading}>
                    {isLoading ? "Saving..." : initialData ? "Update Quest" : "Create Quest"}
                </Button>
            </div>
        </form>
    );
};