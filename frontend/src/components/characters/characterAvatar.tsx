import React from "react";
import { Avatar } from "./avatar";
import { XpRing } from "./xpRing";
import { LevelBadge } from "./levelBadge";





export interface CharacterAvatarProps {
  src?: string;
  alt?: string;
  level?: number;
  xp?: number;
  size?: number;
  className?: string;
}




export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  src,
  alt = "avatar",
  level = 1,
  xp = 0,
  size = 64,
  className = "",
}) => {


  const linewidth = 4;
  const innerAvatarSize = size - linewidth * 2 - 4;



  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>


      <XpRing level={level} xp={xp} size={size} strokeWidth={linewidth}>


        <Avatar src={src} alt={alt} size={innerAvatarSize} />
      </XpRing>

      {level !== undefined && (
        <LevelBadge level={level} className="absolute -bottom-1 -left-1 shadow-md" />
      )}
    </div>
  );
};
