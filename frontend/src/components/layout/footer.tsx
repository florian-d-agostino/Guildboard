import React from "react";
import { Button } from "./button";

export interface FooterProps {
    onOpenCharacters?: () => void;
    onOpenQuests?: () => void;
    className?: string;
}

export const Footer: React.FC<FooterProps> = ({
    onOpenCharacters,
    onOpenQuests,
    className = "",
}) => {
    return (
        <footer className={`flex items-center justify-around py-3 px-6 bg-neutral-900/95 backdrop-blur-md border-t border-neutral-700 ${className}`}>
            {/* Button Quests (left) */}
            <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onOpenQuests}
                className="w-24 py-2 font-bold text-xs"
                aria-label="Open quests list"
            >
                Quests
            </Button>

            {/* Button characters / Heroes (right) */}
            <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onOpenCharacters}
                className="w-24 py-2 font-bold text-xs"
                aria-label="Open characters list"
            >
                Heroes
            </Button>
        </footer>
    );
};

export default Footer;

