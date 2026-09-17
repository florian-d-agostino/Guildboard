import React from "react";
export interface HeaderProps {
    title?: string;
    logoSrc?: string;
    className?: string;
}
export const Header: React.FC<HeaderProps> = ({
    title = "GuildBoard",
    logoSrc,
    className = "",
}) => {
    return (
        <header className={`flex items-center justify-center py-6 ${className}`}>
            
            {logoSrc ? (<img src={logoSrc} alt={title || "Logo"} className="h-12 object-contain"/>) :


                (<div className="bg-[#1f1d1d] border border-neutral-700 rounded-2xl px-8 py-3 shadow-lg">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-widest uppercase">
                        {title}
                    </h1>
                </div>
            )}
        </header>
    );
};

