import { mapValues } from "lodash";
import GenericIcon, {
    IconProps as GenericIconProps,
    iconMap as genericIconMap,
} from "../../../../components/Icon/Icon";
import { ImgHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type IconProps = Omit<GenericIconProps<{}>, "aliasMap" | "icon"> & {
    icon: GenericIconProps<{}>["icon"] | keyof typeof uriMap;
};

export const uriMap = {
    instant: "https://i.imgur.com/Rt7ctov.png",
    battle: "https://i.imgur.com/tcp2Oiw.png",
    food: "https://i.imgur.com/JObw6ks.png",
    stone: "https://i.imgur.com/Cg1yCwi.png",
    metal: "https://i.imgur.com/aErym8E.png",
    gems: "https://i.imgur.com/6QtVKm5.png",
    mead: "https://i.imgur.com/t0nUHXu.png",
    machinery: "https://i.imgur.com/7u0mTR8.png",
    runes: "https://i.imgur.com/18rqpKH.png",
    gold: "https://img.icons8.com/color/344/average.png",
    tierTreasure: "https://i.imgur.com/HCkmqo6.png",
    tierBattle: "https://i.imgur.com/QjByN1S.png",
    tierEvent: "https://i.imgur.com/aAaaDMO.png",
    productionToken: "https://i.imgur.com/sFKEtEp.png",
    productionSlot: "https://i.imgur.com/qFWaMri.png",
    assignProduction: "https://i.imgur.com/OYrwm3O.png",
    buildProduction: "https://i.imgur.com/vIdTr9I.png",
    produceResource: "https://i.imgur.com/eGrTlHO.png",
    resource: "https://i.imgur.com/gSLbm3s.png",
    makeGolem: "https://i.imgur.com/c2QJuuk.png",
    playerTokenBlue: "https://i.imgur.com/ghRMYqM.png",
    dwarfMeepleBlue: "https://i.imgur.com/IWjFG0S.png",
    golemMeepleBlue: "https://i.imgur.com/HO4wT7y.png",
    playerTokenRed: "https://i.imgur.com/5Oieakw.png",
    dwarfMeepleRed: "https://i.imgur.com/ahlbymy.png",
    golemMeepleRed: "https://i.imgur.com/TrjKU6D.png",
    playerTokenPurple: "https://i.imgur.com/Ba0EKi5.png",
    dwarfMeeplePurple: "https://i.imgur.com/qhGIToN.png",
    golemMeeplePurple: "https://i.imgur.com/qWhGU66.png",
    playerTokenOrange: "https://i.imgur.com/eWW8d58.png",
    dwarfMeepleOrange: "https://i.imgur.com/Z2yFuT5.png",
    golemMeepleOrange: "https://i.imgur.com/LHqUxsj.png",
    dwarfBlue: "https://i.imgur.com/Pui4VFm.png",
    dwarf: "https://i.imgur.com/GmTW9Op.png",
    player: "https://i.imgur.com/Blurrgt.png",
    players: "https://i.imgur.com/DC9QBaD.png",
    warning: "https://img.icons8.com/color/344/error--v1.png",
    lowerProductionBlue: "https://i.imgur.com/oaHZaVU.png",
    higherProductionBlue: "https://i.imgur.com/0kYGyC2.png",
    lowerProductionPurple: "https://i.imgur.com/n8As6jI.png",
    higherProductionPurple: "https://i.imgur.com/xJkspqz.png",
    lowerProductionRed: "https://i.imgur.com/C9PkR7y.png",
    higherProductionRed: "https://i.imgur.com/IZmTCFC.png",
    lowerProductionOrange: "https://i.imgur.com/mERde6U.png",
    higherProductionOrange: "https://i.imgur.com/MWhxXK2.png",
    higherProduction: "https://i.imgur.com/AXdpdGF.png",
    lowerProduction: "https://i.imgur.com/bv4S28S.png",
    productionShiftSlot: "https://i.imgur.com/mYszDdF.png",
    gemDie: "https://i.imgur.com/2xqNRb4.png",
    drawExtraCard: "https://i.imgur.com/dhrpW0Z.png",
    golemSlot: "https://i.imgur.com/1a52JXA.png",
    resourceSlot: "https://i.imgur.com/MzM8uOd.png",
} as const;

export type ImgIconProps = ImgHTMLAttributes<HTMLImageElement>;
const ImgIcon = ({ className, alt = "", ...restProps }: ImgIconProps) => (
    <img className={twMerge("h-4", className)} alt={alt} {...restProps} />
);

export const componentMap = {
    ...genericIconMap,
    ...mapValues(uriMap, (value) => (props: Omit<ImgIconProps, "src">) => <ImgIcon src={value} {...props} />),
};

export type IconType = keyof typeof componentMap;

const isUriIcon = (icon: IconProps["icon"]): icon is keyof typeof uriMap => {
    return icon in uriMap;
};

export default function Icon(props: IconProps) {
    if (isUriIcon(props.icon)) {
        const { icon, params, ...restProps } = props;
        return <ImgIcon src={uriMap[icon]} {...restProps} {...params} />;
    }
    return <GenericIcon {...props} />;
}
