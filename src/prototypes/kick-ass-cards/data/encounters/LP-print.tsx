import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import ActorCard, { ActorCardBackFace } from "../../components/gameComponents/ActorCard";
import AssetCard, { AssetCardBackFace } from "../../components/gameComponents/AssetCard";
import PaperMini from "../../components/gameComponents/PaperMini";
import ChunkedPages from "../../components/print/ChunkedPages";
import { characters, defaultActorProps, items } from "./LP-common-en";

const sizePerPageMap = {
    small: 4 * 4,
    medium: 3 * 3,
};
const assetItems = multiplyByCount(Object.values(items), "count", defaultCountAdapter).map((item) => ({
    ...item,
    bleedMm: 3,
    className: "relative -m-[3mm]",
}));
const actorItems = Object.values(characters).map((item) => ({
    ...item,
    bleedMm: 3,
    className: "relative -m-[3mm]",
}));
export default function LPCardPages() {
    return (
        <>
            <ChunkedPages
                Component={AssetCard}
                BackFaceComponent={AssetCardBackFace}
                items={assetItems}
                itemsPerPage={sizePerPageMap.small}
                frontFacePrintPageProps={{
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
                Component={ActorCard}
                BackFaceComponent={ActorCardBackFace}
                items={actorItems}
                itemsPerPage={sizePerPageMap.medium}
                frontFacePrintPageProps={{
                    bleedInMm: 0,
                    contentClassName: "p-[3mm]",
                }}
                backFacePrintPageProps={{
                    bleedInMm: 0,
                    contentClassName: "p-[3mm]",
                }}
                label="Actors"
            />
            <PrintPage key={"action-deck-page"}>
                <div className="flex flex-wrap content-center items-center justify-center">
                    <ActorCard
                        {...defaultActorProps}
                        bleedMm={3}
                        className="m-[-3mm]"
                        name="Amara"
                        notes="Uses her ankh to control drones for reconnaissance and attack"
                        occupation="Mercenary"
                        size="Bridge"
                        threat="Attacks with a laser sun gun"
                        toughness={4}
                        currentToughness={4}
                        imageUri="/LP/characters/amara.png"
                        children={<PrintMarkerCorners />}
                    />
                    <ActorCard
                        {...defaultActorProps}
                        bleedMm={3}
                        className="m-[-3mm]"
                        name="Holden Cantos"
                        occupation="Handyman"
                        size="Bridge"
                        threat="Boosts turbine to burn stuff and melt metal"
                        notes="Builds drones for recon and attack"
                        toughness={4}
                        currentToughness={4}
                        imagePosition="top"
                        imageUri="/LP/characters/holden.png"
                        children={<PrintMarkerCorners />}
                    />
                    <PaperMini
                        className="ml-4 mt-10"
                        imageUri="/LP/characters/holden.png"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Holden"
                        imageStyle={{ backgroundPosition: "center bottom" }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Holden"
                        baseWidth="0.5in"
                        height="2in"
                        width="1in"
                    />
                    <PaperMini
                        className="mt-10"
                        imageUri="/LP/characters/amara.png"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Amara"
                        imageStyle={{ backgroundPosition: "center bottom" }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Amara"
                        baseWidth="0.5in"
                        height="2in"
                        width="1in"
                    />
                    <div className="text-xs font-kacHeading text-kac-iron w-full text-center mt-2 z-10">
                        Player characters
                    </div>
                </div>
            </PrintPage>
        </>
    );
}