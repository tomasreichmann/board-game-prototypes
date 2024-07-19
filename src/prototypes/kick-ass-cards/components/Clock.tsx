import React from "react";
import Icon from "./Icon";
import { PaperProps } from "../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";
import DiceCounter from "./DiceCounter";
import Card, { CardBody, CardHeader } from "./gameComponents/Card";

export type ClockProps = React.PropsWithChildren<
    {
        slug?: string;
        deck?: string;
        className?: string;
        size?: PaperProps["size"];
        forPrint?: boolean;
        icon?: string | null;
        title?: string | null;
        reward?: string | null;
        threat?: string | null;
        note?: string | null;
        total?: number;
        current?: number;
    } & Partial<PaperProps>
>;

export default function Clock({
    className,
    forPrint,
    icon,
    title = forPrint ? "" : null,
    reward = forPrint ? "" : null,
    threat = forPrint ? "" : null,
    note = forPrint ? "" : null,
    total,
    current = 0,
    deck,
    children,
    ...restProps
}: ClockProps) {
    return (
        <Card className={twMerge("Clock", className)} {...restProps}>
            <CardHeader
                icon={icon ?? undefined}
                className="z-10"
                cornerIcon="sandsOfTime"
                cornerIconClassName="text-kac-iron-dark"
                deck={deck ?? undefined}
            ></CardHeader>
            <CardBody
                className="min-h-[40%] basis-auto"
                iconContent={
                    total !== undefined ? (
                        <DiceCounter
                            current={current}
                            total={total}
                            className="flex-1 flex flex-col justify-center text-kac-iron-light self-stretch h-24"
                        />
                    ) : (
                        <div className="h-full flex flex-row flex-wrap gap-2 justify-center content-center items-center px-4">
                            <Icon icon="d4" className={"w-8 h-8"} />
                            <Icon icon="d6" className={"w-8 h-8"} />
                            <Icon icon="d8" className={"w-8 h-8"} />
                            <Icon icon="d10" className={"w-8 h-8"} />
                            <Icon icon="d12" className={"w-8 h-8"} />
                        </div>
                    )
                }
                childrenClassName="shrink-0 basis-auto flex flex-col align-stretch gap-1 text-left"
            >
                {title !== null && (
                    <h2 className="text-sm font-kacHeading leading-tight text-balance text-center">
                        {title || <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em]" />}
                    </h2>
                )}
                {note !== null && (
                    <div className="text-sm text-kac-bone-dark font-kacBody flex flex-row gap-2">
                        <Icon icon="scrollQuill" className="h-5 flex-shrink-0 inline-block" />
                        {note ? (
                            <p className="flex-grow text-sm font-kacBody leading-tight">{note}</p>
                        ) : (
                            <div className="flex-1 flex-col">
                                <div className="border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1"></div>
                                <div className="border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1"></div>
                            </div>
                        )}
                    </div>
                )}
                {reward !== null && (
                    <div className="text-sm text-kac-gold-dark font-kacBody flex flex-row gap-2">
                        <div className="flex flex-col items-center justify-start -mt-4">
                            ▲
                            <Icon icon="chest" className="h-5 flex-shrink-0 inline-block text-sm" />
                        </div>
                        {reward ? (
                            <p className="flex-grow text-sm font-kacBody leading-tight">{reward}</p>
                        ) : (
                            <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1" />
                        )}
                    </div>
                )}
                {threat !== null && (
                    <div className="text-sm text-kac-blood font-kacBody flex flex-row gap-2">
                        <div className="flex flex-col items-center justify-start -mb-4">
                            <Icon icon="deathSkull" className="h-5 flex-shrink-0 inline-block" />▼
                        </div>
                        {threat ? (
                            <p className="flex-grow text-sm font-kacBody leading-tight">{threat}</p>
                        ) : (
                            <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1" />
                        )}
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

/* <PaperOrDiv
            size={size}
            className={twMerge("Clock flex flex-col text-kac-steel-dark bg-white relative rounded-lg", className)}
            {...restProps}
        >
            <div
                className="relative flex-1 flex flex-col justify-center items-stretch"
                style={{
                    margin: `-${bleedTopMm}mm -${bleedRightMm}mm -${bleedBottomMm}mm -${bleedLeftMm}mm`,
                    padding: `${bleedTopMm}mm ${bleedRightMm}mm ${bleedBottomMm}mm ${bleedLeftMm}mm`,
                }}
            >
                <div className="flex-1 relative flex flex-col p-3 gap-2">
                    <div className="relative flex flex-row items-center justify-end">
                        <Icon icon="sandsOfTime" className="h-5 text-kac-iron-dark" />
                    </div>
                    {total !== undefined ? (
                        <DiceCounter
                            current={current}
                            total={total}
                            className="flex-1 text-kac-steel self-stretch h-32"
                        />
                    ) : (
                        <div className="flex-1 flex flex-row flex-wrap gap-2 justify-center items-center px-4">
                            <Icon icon="d4" className={"w-8 h-8"} />
                            <Icon icon="d6" className={"w-8 h-8"} />
                            <Icon icon="d8" className={"w-8 h-8"} />
                            <Icon icon="d10" className={"w-8 h-8"} />
                            <Icon icon="d12" className={"w-8 h-8"} />
                        </div>
                    )}
                    {title !== null && (
                        <h2 className="text-sm font-kacHeading leading-tight text-balance mt-1 mb-1 text-center">
                            {title || (
                                <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em]" />
                            )}
                        </h2>
                    )}
                    {note !== null && (
                        <div className="text-sm text-kac-bone-dark font-kacBody flex flex-row gap-2">
                            <Icon icon="scrollQuill" className="h-5 flex-shrink-0 inline-block" />
                            {note ? (
                                <p className="flex-grow text-sm font-kacBody leading-tight">{note}</p>
                            ) : (
                                <div className="flex-1 flex-col">
                                    <div className="border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1"></div>
                                    <div className="border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1"></div>
                                </div>
                            )}
                        </div>
                    )}
                    {reward !== null && (
                        <div className="text-sm text-kac-gold-dark font-kacBody flex flex-row gap-2">
                            <div className="flex flex-col items-center justify-start -mt-4">
                                ▲
                                <Icon icon="chest" className="h-5 flex-shrink-0 inline-block text-sm" />
                            </div>
                            {reward ? (
                                <p className="flex-grow text-sm font-kacBody leading-tight">{reward}</p>
                            ) : (
                                <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1" />
                            )}
                        </div>
                    )}
                    {threat !== null && (
                        <div className="text-sm text-kac-blood font-kacBody flex flex-row gap-2 pb-4">
                            <div className="flex flex-col items-center justify-start -mb-4">
                                <Icon icon="deathSkull" className="h-5 flex-shrink-0 inline-block" />▼
                            </div>
                            {threat ? (
                                <p className="flex-grow text-sm font-kacBody leading-tight">{threat}</p>
                            ) : (
                                <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1" />
                            )}
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </PaperOrDiv> */
