import React from "react";

export interface LevelBadgeProps {
  level: number;
  className?: string;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, className = "" }) => {
  return (
    <span
      className={`flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-[#1a1818] border border-neutral-700 rounded-full shadow-lg select-none ${className}`}
    >
      {level}
    </span>
  );
};
