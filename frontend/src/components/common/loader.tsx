import React from "react";

export interface LoaderProps {
    message?: string;
    size?: "sm" | "md" | "lg";
}

export const Loader: React.FC<LoaderProps> = ({
    message = "Loading...",
    size = "md",
}) => {
    const sizeClasses = {
        sm: "w-5 h-5 border-2",
        md: "w-10 h-10 border-4",
        lg: "w-16 h-16 border-4",
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-4 select-none">
            {/* Spinner */}
            <div className={`${sizeClasses[size]} border-neutral-700 border-t-red-500 rounded-full animate-spin`} />
            {message && (
                <p className="text-sm font-medium text-neutral-400 tracking-wide">
                    {message}
                </p>
            )}
        </div>
    );
};

export default Loader;