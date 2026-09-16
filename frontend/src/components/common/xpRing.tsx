import React from "react";

export interface XpRingProps {
  level?: number;
  xp?: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

export const XpRing: React.FC<XpRingProps> = ({
  level = 1,
  xp = 0,
  size = 68,
  strokeWidth = 4,
  children,
}) => {
  const maxXp = Math.max(1, level * 100);
  const percent = Math.min(100, Math.max(0, (xp / maxXp) * 100));

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>


        {/* BG Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#3f3f46"
          strokeWidth={strokeWidth}
        />



        {/* XP Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#22c55e"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {children}
    </div>
  );
};
