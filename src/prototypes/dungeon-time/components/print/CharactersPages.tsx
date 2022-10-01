import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import DataToggle from "../../../../components/DataToggle";
import PlayerCharacterCard from "../gameComponents/PlayerCharacterCard";
import { usePlayerCharacters } from "../../hooks/usePlayerCharacters";

const CARDS_PER_PAGE = 3 * 2;

export default function CharactersPages() {
    const { data = [] } = usePlayerCharacters();
    const totalPages = Math.ceil(data.length / CARDS_PER_PAGE);

    return (
        <>
            {chunk(data, CARDS_PER_PAGE).map((characters, pageIndex) => (
                <PrintPage key={"characters-page-" + pageIndex}>
                    <div className="flex flex-wrap content-center items-center">
                        {characters.map((character) => (
                            <PlayerCharacterCard
                                key={character.slug}
                                {...character}
                                className="relative"
                            >
                                <PrintMarkerCorners />
                            </PlayerCharacterCard>
                        ))}
                        <h2 className="text-2xl font-dtHeading text-blood-3 w-full text-center">
                            Player Characters {pageIndex + 1}/{totalPages}
                        </h2>
                    </div>
                </PrintPage>
            ))}
            <div className="w-full">
                <DataToggle data={data} initialCollapsed />
            </div>
        </>
    );
}
