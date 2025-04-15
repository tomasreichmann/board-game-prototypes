import React from "react";
import Text, { Title } from "./Text";
import Page from "./Page";

export default function CoverPage() {
    return (
        <Page>
            <div className="flex-1 flex flex-col items-center justify-center gap-2 mt-[30mm]">
                <img
                    src="/mighty-decks/mighty_decks_logo.png"
                    alt="Mighty Decks Logo"
                    className="w-8/12 -mb-5 opacity-100"
                />
                <Title
                    center
                    className="bg-clip-text text-transparent bg-[linear-gradient(to_top,_#ffae35_50%,_#ffc851_50%)] [transform:perspective(500px)_rotateX(30deg)] drop-shadow-title"
                >
                    Rulebook
                </Title>
                <div className="flex-1"></div>
                <Text className="text-xl font-bold text-kac-gold-darker tracking-tight drop-shadow-emboss" center>
                    One Card System,
                    <br />
                    Countless Adventures
                </Text>
            </div>
        </Page>
    );
}
