import React from "react";
import Icon from "../Icon";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";

export type InfoCardProps = React.PropsWithChildren<{
    className?: string;
    size?: PaperProps["size"];
    forPrint?: boolean;
}>;

export default function InfoCard({
    className,
    forPrint,
    size = forPrint ? "Square" : undefined,
    children,
}: InfoCardProps) {
    return (
        <PaperOrDiv
            size={size}
            className={twMerge(
                "InfoCard relative bg-white p-5 flex flex-column gap-5 text-kac-steel-dark rounded-lg font-kacBody",
                className
            )}
        >
            <div className="flex-1 flex flex-col gap-[2px] text-sm items-stretch">
                <div className="flex flex-row gap-2 items-center mb-1">
                    <Icon icon="blackBook" className={"text-kac-cloth-dark h-5"} />
                    <h2 className="font-kacHeading text-kac-cloth-dark">Nápověda pro hráče</h2>
                </div>
                <div>
                    <span className="font-bold text-kac-iron">Tah hráče:</span> 1x&nbsp;pohyb o 1&nbsp;zónu a
                    1x&nbsp;akce nebo extra pohyb. Následují postavy a hrozby na stole před hráčem.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        2x
                        <Icon icon="drop" className={"text-kac-blood h-5 inline-block"} /> Zranění:
                    </span>{" "}
                    Jsi v <span className="font-bold text-kac-cloth-dark">Zmámený</span>. Tvůj{" "}
                    <span className="font-bold text-kac-monster-dark">Úspěch</span> se počítá jako{" "}
                    <span className="font-bold text-kac-monster-dark">Částečný úspěch</span>.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        4x
                        <Icon icon="drop" className={"text-kac-blood h-5 inline-block"} /> Zranění:
                    </span>{" "}
                    Jsi v <span className="font-bold text-kac-iron-dark">Bezvědomí</span>. Nemůžeš provádět akce dokud
                    tě někdo nevzkřísí.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        3x
                        <Icon icon="tearTracks" className={"text-kac-cloth h-5 inline-block"} /> Tíseň:
                    </span>{" "}
                    Zachvátila tě <span className="font-bold text-kac-curse">Panika</span>. Místo z ruky hraj na slepo
                    vrchní kartu balíčku Výsledků.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        4x
                        <Icon icon="tearTracks" className={"text-kac-cloth h-5 inline-block"} /> Tíseň:
                    </span>{" "}
                    Paralizuje tě <span className="font-bold text-kac-iron-dark">Beznaděj</span>. Místo akce můžeš jen
                    utíkat do bezpečí, nebo se vzdát.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        2x
                        <Icon icon="thermometerHot" className={"text-kac-fire h-5 inline-block"} /> Horko:
                    </span>{" "}
                    Na konci svého kola získáš <span className="font-bold text-kac-blood">Zranění</span>.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        2x
                        <Icon icon="thermometerHot" className={"text-kac-cloth h-5 inline-block"} /> Mráz:
                    </span>{" "}
                    Na konci svého kola získáš <span className="font-bold text-cloth">Tíseň</span>.
                </div>
            </div>
            {children}
        </PaperOrDiv>
    );
}
