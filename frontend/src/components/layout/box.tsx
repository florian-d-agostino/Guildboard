import React from "react";



export interface BoxProps {
    children: React.ReactNode;
    title?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}


export const Box: React.FC<BoxProps> = ({
    children,
    title,
    action,
    className = "",
}) => {
    return (

        <div className={`bg-[#1f1d1d] border border-neutral-700 rounded-2xl shadow-lg flex flex-col overflow-hidden ${className}`}>


            {/* Header */}
            {(title || action) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-700 bg-neutral-800/50">
                    {title && (
                        <h2 className="text-lg font-bold text-white tracking-wide">
                            {title}
                        </h2>
                    )}
                    {action && <div>{action}</div>}
                </div>
            )}


            {/* Main */}
            <div className="p-6 flex-1">
                {children}
            </div>
        </div>
    );
};
