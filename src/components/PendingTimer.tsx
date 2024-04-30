import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export type PendingTimerProps = {
    startTime?: number;
    clockClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const PendingTimer = ({ className, children, clockClassName, ...restProps }: PendingTimerProps) => {
    const [time, setTime] = useState<number>(0);

    const startTime = useRef(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime.current;
            setTime(elapsedTime);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [startTime]);

    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const decimalSeconds = Math.floor((time % 1000) / 100);
    const degrees = Math.floor((seconds / 60) * 360);

    return (
        <div
            className={twMerge(
                "font-kacBody text-kac-steel-dark text-md text-center flex flex-col items-center",
                className
            )}
            {...restProps}
        >
            <div
                className={twMerge(
                    "size-12 rounded-full relative bg-kac-steel-light border-2 border-kac-steel",
                    clockClassName
                )}
            >
                <div
                    className="w-0.5 h-[45%] bg-kac-steel-dark rounded-sm absolute left-1/2 bottom-1/2 origin-bottom"
                    style={{ transform: `translateX(-50%) rotate(${degrees}deg)` }}
                />
                <div className="w-1 h-1 bg-kac-steel-dark rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            {children}
            <div className="flex flex-row">
                <span className="min-w-[2ch] text-center">{minutes.toString().padStart(2, "0")}</span>:
                <span className="min-w-[2ch] text-center">{seconds.toString().padStart(2, "0")}</span>.
                <span className="min-w-[1ch] text-center">{decimalSeconds}</span>
            </div>
        </div>
    );
};

export default PendingTimer;
