import React from "react";
import ChunkedPages from "./ChunkedPages";
import { assets, extraSecrets, organizations, roles } from "../../data/encounters/B139-cs";
import Paper, { PaperProps } from "../../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";
import Text from "../content/Text";
import { range } from "lodash";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";

type OrganizationType = {
    name: string;
    vision: string;
    sign: string;
    ability: string;
    secrets: string[];
    goals: string[];
};

const typeColorMap: Record<string, string> = {
    Finance: "#4fd03c",
    Právo: "#fffd01",
    Suroviny: "#4fd03c",
    Technologie: "#82b3ed",
    Energie: "#01ffb2",
    Luxus: "#c9a8e8",
};

const organizationNameMap: Record<string, OrganizationType> = {
    "X Syndicate": organizations.x_syndicate,
    TerraVita: organizations.terra_vita,
    "Ascended Intelligence": organizations.ascended_intelligence,
    "Shadow Net": organizations.shadow_net,
    "Lux Impérium": organizations.lux_impérium,
    "Zatnutá pěst": organizations.zatnutá_pěst,
};

const organizationIconMap: Record<string, string> = {
    "Ascended Intelligence": "/B139/ascended-intelligence-logo.png",
    TerraVita: "/B139/terra-vita-logo.png",
    "X Syndicate": "/B139/x-syndicate-logo.png",
    "Lux Impérium": "/B139/lux-imperium-logo.png",
    "Shadow Net": "/B139/shadow-net-logo.png",
    "Zatnutá pěst": "/B139/zatnuta-pest-logo.png",
};

const AssetCard = ({ name, types, className, ...restProps }: (typeof assets)[number] & Partial<PaperProps>) => (
    <Paper
        {...restProps}
        size="Mini US game"
        orientation="landscape"
        className={twMerge(
            "AssetCard flex flex-col items-center justify-center font-kacBody leading-tight text-center",
            className
        )}
        style={{
            background: `url(/B139/data-storage.png) no-repeat center center / contain`,
        }}
    >
        <div className="w-[150px] h-[110px] flex flex-col items-center justify-between">
            <div className="text-md opacity-80">{name}</div>
            <div className="text-sm opacity-80 text-gray-400">
                {types.map((type, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && " | "}
                        <span className="uppercase" style={{ color: typeColorMap[type] }}>
                            {type}
                        </span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    </Paper>
);

const RoleCard = ({
    name: role,
    entity,
    goals,
    organization,
    className,
    index,
}: (typeof roles)[number] & Partial<PaperProps> & { index: number }) => {
    const { name: orgName, vision, sign, ability, secrets, goals: orgGoals } = organizationNameMap[organization] ?? {};
    const logo = organizationIconMap[orgName];
    return (
        <div
            className={twMerge("RoleCard self-stretch w-1/3 font-kacBody leading-tight relative", className)}
            /* style={{
            background: `url(/B139/data-storage.png) no-repeat center center / contain`,
        }} */
        >
            <div className="w-full h-full flex flex-col justify-start relative p-4">
                <Text variant="h6" className="absolute left-4 top-4 text-kac-steel-dark">
                    #{(index + 1).toString().padStart(2, "0")}
                </Text>
                <div className="flex flex-row gap-1 mb-2">
                    <img src={logo} alt={orgName} className="w-1/3 object-contain h-16 mt-2" />
                    <div className="flex-1 flex flex-col text-left">
                        <Text variant="h6" className="text-xs text-kac-steel-dark">
                            Jméno{entity ? ` (jsi ${entity})` : ""}
                        </Text>
                        <hr className="border-t-2 border-dashed border-kac-steel-dark mt-8 mb-2" />
                        <Text variant="h6" className="text-xs text-kac-steel-dark">
                            Role: <span className="text-kac-cloth-dark">{role}</span>
                        </Text>
                    </div>
                </div>
                <Text variant="h6" className="text-[13px] text-kac-steel-dark">
                    Vize organizace {orgName}
                </Text>
                <Text variant="body" className="text-xs">
                    {vision}
                </Text>
                <Text variant="h6" className="text-[13px] text-kac-steel-dark mt-1">
                    Poznávací znamení členů
                </Text>
                <Text variant="body" className="text-xs">
                    {sign}
                </Text>
                <Text variant="h6" className="text-[13px] text-kac-steel-dark mt-1">
                    Tajemství o kterých má organizace povědomí
                </Text>
                <div className="flex flex-col gap-1">
                    {secrets.map((secret, secretIndex) => (
                        <Text key={secretIndex} variant="body" className="text-xs">
                            {secret}
                        </Text>
                    ))}
                </div>
                <Text variant="h6" className="text-[13px] text-kac-steel-dark mt-1">
                    Cíle organizace
                </Text>
                <div className="flex flex-col gap-2">
                    {orgGoals.map((orgGoal, orgGoalIndex) => (
                        <Text key={orgGoalIndex} variant="body" className="text-xs font-bold text-kac-iron-light">
                            {orgGoal}
                        </Text>
                    ))}
                </div>
                <Text variant="h6" className="text-[13px] text-kac-steel-dark mt-1">
                    Osobní cíle
                </Text>
                <div className="flex flex-col gap-2">
                    {goals.map((goal, goalIndex) => (
                        <Text key={goalIndex} variant="body" className="text-xs font-bold text-kac-iron-light">
                            {goal}
                        </Text>
                    ))}
                </div>
                <div className="flex-1 flex flex-col justify-end mt-2">
                    <Text variant="h6" className="text-xs text-kac-steel-dark text-center">
                        Přehnout ⤵
                    </Text>
                    <hr className="border-t-2 border-dashed border-kac-steel-light mb-1" />
                    <Text variant="h6" className="text-[13px] text-kac-steel-dark mt-1">
                        Schopnost člena organizace
                    </Text>
                    <Text variant="body" className="text-xs">
                        {ability}
                    </Text>
                </div>
            </div>
        </div>
    );
};

const LogoCard = ({ imgUri, className, ...restProps }: { imgUri: string } & Partial<PaperProps>) => (
    <Paper
        {...restProps}
        size="Mini US game"
        orientation="landscape"
        className={twMerge(
            "AssetCard flex flex-col items-center justify-center font-kacBody leading-tight text-center relative p-8 -my-[5px]",
            className
        )}
        style={{
            background: `url(/B139/badge.png) no-repeat center center / 105%`,
        }}
    >
        <img src={imgUri} alt="logo" className="w-full h-full object-contain" />
    </Paper>
);

const assetsProps = assets.map((item) => ({
    ...item,
    bleedMm: 3,
    className: "relative -m-[3mm]",
}));

const rolesProps = roles.map((item, index) => ({
    ...item,
    index,
}));

const logosProps = range(3 * 4).map((index) => ({
    imgUri: [
        organizationIconMap["Ascended Intelligence"],
        organizationIconMap["TerraVita"],
        organizationIconMap["X Syndicate"],
    ][Math.floor(index / 4)],
    index,
}));

export default function BDay139CarPages() {
    return (
        <>
            <ChunkedPages
                Component={RoleCard}
                items={rolesProps}
                itemsPerPage={3 * 1}
                frontFacePrintPageProps={{
                    orientation: "landscape",
                    bleedInMm: 0,
                    className: "flex flex-col",
                    contentClassName: "p-[3mm] flex-1 flex relative items-stretch contents-stretch",
                }}
                backFacePrintPageProps={{
                    bleedInMm: 0,
                    contentClassName: "p-[3mm]",
                }}
                label={"Roles"}
            />
            <ChunkedPages
                Component={AssetCard}
                items={assetsProps}
                itemsPerPage={4 * 4}
                frontFacePrintPageProps={{
                    orientation: "landscape",
                    bleedInMm: 0,
                    contentClassName: "p-[3mm]",
                }}
                backFacePrintPageProps={{
                    bleedInMm: 0,
                    contentClassName: "p-[3mm]",
                }}
                label="Assets"
            />
            <ChunkedPages
                Component={LogoCard}
                items={logosProps}
                itemsPerPage={4 * 6}
                frontFacePrintPageProps={{
                    orientation: "landscape",
                    bleedInMm: 0,
                    contentClassName: "p-[3mm]",
                }}
                backFacePrintPageProps={{
                    bleedInMm: 0,
                    contentClassName: "p-[3mm]",
                }}
                label="Logos"
            />
            <PrintPage size="A4" orientation="landscape">
                <div className="flex flex-col flex-wrap"></div>
                {extraSecrets.map((secret, index) => (
                    <div className="p-4 w-1/2" key={index}>
                        <Text variant="h6" className="text-md text-kac-steel-dark text-center text-balance">
                            {secret}
                        </Text>
                    </div>
                ))}
            </PrintPage>
        </>
    );
}
