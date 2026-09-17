import React from "react";





export interface FooterProps {
    onOpenCharacters?: () => void;
    onOpenQuests?: () => void;
    className?: string;
}


export const Footer: React.FC<FooterProps> = ({onOpenCharacters,
    onOpenQuests,
    className = ""}) => {
        return (
            <footer className={`flex items-center justify-around py-4 px-6 bg-neutral-800 border-t border-neutral-700 ${className}`}>


                {/* Button characters  */}

                <button
                    type="button"
                    onClick={onOpenCharacters}
                    className="w-16 h-14 bg-neutral-300 hover:bg-white text-neutral-800 rounded-xl shadow-md flex items-center justify-center font-bold text-xs transition-all active:scale-95 cursor-pointer"

                    aria-label="Open characters list">
                        Heroes
                    </button>



                    {/* Button Quests */}

                    <button
                        type="button"
                        onClick={onOpenQuests}
                        className="w-16 h-14 bg-neutral-300 hover:bg-white text-neutral-800 rounded-xl shadow-md flex items-center justify-center font-bold text-xs transition-all active:scale-95 cursor-pointer"

                        aria-label="Open quests list">
                        Quests
                    </button>
        </footer>
    );
};

