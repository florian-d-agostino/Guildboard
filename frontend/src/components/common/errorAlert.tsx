import React from "react";
import { Button } from "../layout/button";

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
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={onRetry}
                    >
                        Retry
                    </Button>
                )}
            </div>
        )
    }

export default ErrorAlert;