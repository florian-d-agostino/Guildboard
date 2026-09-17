import React from "react";

export interface EmptyStateProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}
export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    action,
    className = "",
}) => {
    return (
        <div className={`flex flex-col items-center justify-center p-8 text-center bg-neutral-900/40 border border-dashed border-neutral-800 rounded-2xl ${className}`}>
            <h3 className="text-base font-bold text-neutral-200">{title}</h3>
            {description && (
                <p className="text-sm text-neutral-400 mt-1 max-w-sm">
                    {description}
                </p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
};
export default EmptyState;