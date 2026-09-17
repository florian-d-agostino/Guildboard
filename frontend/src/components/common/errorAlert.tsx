import React from "react";

export interface ErrorAlertProps {
    message: string;
    onRetry?: () => void;
    className?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> =
    ({
        message,
        onRetry,
        className = " "
    }) => {

        return (
            <div
                role="alert"
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-red-950/40 border border-red-800/80 text-red-200 rounded-xl shadow-lg ${className}`}
            >
                <div className="flex items-center gap-3">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                {onRetry && (
                    <button
                        type="button"
                        onClick={onRetry}
                        className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-100 bg-red-800/80 hover:bg-red-700 rounded-lg transition-colors cursor-pointer border border-red-700 shrink-0"
                    >
                        Retry
                    </button>
                )}
            </div>
        )
    }

export default ErrorAlert;