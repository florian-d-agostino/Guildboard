import React, { useState, useEffect } from "react";
import styles from "./questProgressBar.module.css";

export type QuestProgressBarProps = {
    totalDurationSeconds: number;
    onFinish?: () => void;
    className?: string;
};

export const QuestProgressBar: React.FC<QuestProgressBarProps> = ({
    totalDurationSeconds,
    onFinish,
    className = "",
}) => {
    const [elapsed, setElapsed] = useState<number>(0);

    // Ensure we don't divide by zero
    const duration = Math.max(1, totalDurationSeconds);
    const percent = Math.min(100, Math.round((elapsed / duration) * 100));
    const remainingSeconds = Math.max(0, duration - elapsed);

    useEffect(() => {
        // Interval ticking every 1 second
        const intervalId = setInterval(() => {
            setElapsed((prev) => {
                const next = prev + 1;
                if (next >= duration) {
                    clearInterval(intervalId);
                    onFinish?.();
                    return duration;
                }
                return next;
            });
        }, 1000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, [duration, onFinish]);

    return (
        <div className={`flex flex-col gap-1.5 w-full select-none ${className}`}>
            {/* Header info: remaining time and % */}
            <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1 font-mono">
                    {remainingSeconds > 0 ? `${remainingSeconds}s left` : "Done!"}
                </span>
                <span className="font-bold text-yellow-400 font-mono">
                    {percent}%
                </span>
            </div>

            {/* Track container with running knight */}
            <div className="relative pt-8 pb-1">
                {/* Animated Knight Spritesheet */}
                <div
                    className="absolute top-0 -translate-x-1/2 transition-all duration-1000 ease-linear pointer-events-none scale-[0.6] origin-bottom"
                    style={{ left: `${percent}%` }}
                >
                    <div className={`${styles.knightRunning} drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]`} />
                </div>

                {/* Progress bar container */}
                <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-700 shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 rounded-full transition-all duration-1000 ease-linear shadow-lg shadow-amber-500/20"
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuestProgressBar;
