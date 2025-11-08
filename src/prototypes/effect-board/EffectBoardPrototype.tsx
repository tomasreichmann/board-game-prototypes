import React, { PropsWithChildren, useCallback, useRef } from "react";
// import { Outlet } from "react-router-dom";
import { RouteDefinition } from "../../routeTypes";
import Text, { H1 } from "../kick-ass-cards/components/content/Text";
import Page from "@/components/Page/Page";
import Input from "../kick-ass-cards/components/controls/Input";
import Button from "../kick-ass-cards/components/controls/Button";
import { FreesoundResponse, searchFreeSound } from "@/services/Freesound/freesound";
import ToggleData from "@/components/DataToggle";
import SoundResult from "./components/SoundResult";
import { EffectBoardProvider } from "./hooks/useEffectBoard";
import EffectBoard from "./components/EffectBoard";
import LightDashboard from "./components/LightDashboard";
import EffectPlayer from "./components/EffectPlayer";

// import "./KickAssCardsPrototype.css";

export default function EffectBoardPrototype({ children }: PropsWithChildren) {
    const searchRef = useRef<HTMLInputElement>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [searchResults, setSearchResults] = React.useState<FreesoundResponse>();

    const handleSearch = useCallback(() => {
        if (!searchRef.current) return;
        searchFreeSound(searchRef.current?.value)
            .then((results) => setSearchResults(results))
            .catch((error) => setError(error.message));
    }, []);

    return (
        <Page className="SDRoute flex-1 h-svh flex flex-col box-border">
            {/* data-theme="KickAssCardsPrototype" */}
            <H1>Effect Board</H1>
            <EffectPlayer />
            <EffectBoard />
            <LightDashboard />
            <div className="flex flex-col gap-2">
                {error && <Text color="danger">{error}</Text>}
                <div className="flex flex-row gap-2 max-w-md">
                    <Input
                        label="Search"
                        type="text"
                        inputRef={searchRef}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                    <Button type="button" variant="solid" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    {searchResults?.results.map((result, resultIndex) => (
                        <SoundResult key={result.id ?? resultIndex} sound={result} />
                    ))}
                </div>
                <ToggleData data={searchResults} />
            </div>
            {children}
        </Page>
    );
}

export const effectBoardPrototypeRoute: RouteDefinition = {
    name: "Effect Board",
    Component: () => (
        <EffectBoardProvider>
            <EffectBoardPrototype />
        </EffectBoardProvider>
    ),
    path: "/effect-board",
    children: [],
};
