import React from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "avatar",
  size = 56,
  className = "",
}) => {
  return (
    <img
      src={src || `https://api.dicebear.com/7.x/adventurer/svg?seed=${alt}`}
      alt={alt}
      className={`rounded-full object-cover bg-neutral-900 select-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
};