import React from "react";


export interface BadgeProps {
    children : React.ReactNode;
    size? : "sm" | "md";
    icon?: React.ReactNode;
    className?: string;


    variant?: "primary" | "secondary" | "dark" | "light" | "green" | "yellow" | "orange" | "red" | "purple";
}




export const Badge : React.FC<BadgeProps> = ({
    children,
    size = "md",
    icon,
    className = "",
    variant = "primary",
    
}) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full select-none gap-1";

    // Color 
    const variantColors = {
    primary: "bg-guild-primary text-white shadow-sm",
    secondary: "bg-guild-secondary text-white",
    dark: "bg-guild-dark text-white",
    light: "bg-guild-light text-guild-dark shadow-sm",
    accent: "bg-guild-accent text-white",
    green: "bg-guild-green text-white",
    yellow: "bg-guild-yellow text-neutral-950 font-bold",
    orange: "bg-guild-orange text-white",
    red: "bg-guild-red text-white",
    purple: "bg-guild-purple text-white",
    };

    // Size
    const sizeStyles = {
    sm : "px-2 py-0.5 text-xs",
    md : "px-3 py-1 text-sm",
    }

    return (
    <span className={`${baseStyles}
    ${variantColors[variant]}
    ${sizeStyles[size]} ${className}`}>
    {icon && <span className="inline-flex">{icon}</span>}
    {children}
    </span>
);
}
