import type { ReactNode } from "react";

interface TooltipProps {

    children: ReactNode;

    content: ReactNode;

}

export default function Tooltip({

    children,

    content,

}: TooltipProps) {

    return (

        <div className="group relative inline-flex">

            {children}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-full
                    z-50
                    mt-2
                    w-72
                    -translate-x-1/2
                    rounded-xl
                    bg-slate-900
                    px-4
                    py-3
                    text-sm
                    leading-relaxed
                    text-white
                    opacity-0
                    shadow-xl
                    transition-all
                    duration-200
                    group-hover:translate-y-1
                    group-hover:opacity-100
                "
            >

                {content}

                <div
                    className="
                        absolute
                        left-1/2
                        top-0
                        h-3
                        w-3
                        -translate-x-1/2
                        -translate-y-1/2
                        rotate-45
                        bg-slate-900
                    "
                />

            </div>

        </div>

    );

}