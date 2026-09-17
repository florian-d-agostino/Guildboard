import React, { useEffect } from "react";





export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: React.ReactNode;
    footer?: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}




export const Modal: React.FC<ModalProps> = ( {
    isOpen,
    onClose,
    children,
    title,
    footer,
    size = "md",
}) => { 



   // Escape key close
    useEffect(() => {
        if (!isOpen) return;

        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);



    if (!isOpen) return null;




        // Size dictionary
        const sizeStyles = {
        sm : "max-w-sm",
        md : "max-w-md",
        lg : "max-w-lg",
        xl : "max-w-2xl",
    };

    return (


        // Overlay
        <div className={"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"}

        onClick={onClose} >



            {/* Main window */}
            <div className={`w-full ${sizeStyles[size]} bg-[#282525] text-white rounded-2xl shadow-2xl border border-neutral-700 flex flex-col overflow-hidden`}

            onClick={(e) => e.stopPropagation()}
            >


            {/* Header */}
            <div className={"flex items-center justify-between px-6 py-4 border-b border-neutral-700 bg-neutral-800/60"}>
                <h3 className={"text-lg font-bold text-white tracking-wide"}>
                    {title}
                </h3>

                {/* Close button */}
                <button 
                    type="button"
                    onClick={onClose}
                    className={"text-neutral-400 hover:text-white hover:bg-neutral-700/60 text-xl leading-none w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer"}
                    aria-label="Close"
                >
                    X
                </button>
            </div>

            {/* Body */}
            <div className={`p-6 overflow-y-auto max-h-[75vh]`}>
                {children}
            </div>

            {/* Footer */}
            {footer && (
                <div className={"flex items-center justify-end gap-3 px-6 py-4 bg-neutral-800/40 border-t border-neutral-700"}>
                    {footer}
                </div>
            )}
        </div>
    </div>
    );
};