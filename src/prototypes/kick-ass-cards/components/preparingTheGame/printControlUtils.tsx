import ColorBars from "../../../../components/print/PrintMarker/ColorBars";
import RegistrationMark from "../../../../components/print/PrintMarker/RegistrationMark";
import { getPaperFitCountByFormat } from "../../../../components/print/PrintPage/PrintPage";
import { AnyRecord } from "../../../../utils/simpleTypes";
import { ChunkedPagesProps } from "../print/ChunkedPages";
import { usePrintControlsStore } from "./PaperAndCardControls";

export const useCardsPerPage = () => {
    const {
        defaultPaperSize,
        defaultCardSize,
        defaultPageMarginsMm,
        // defaultGapMm, TODO add to gap to getPaperFitCountByFormat?
        defaultBleedMm,
        isDefaultPaperOrientationPortrait,
    } = usePrintControlsStore();
    const pageOrientation = isDefaultPaperOrientationPortrait ? ("portrait" as const) : ("landscape" as const);

    const cardsPerPage = getPaperFitCountByFormat(
        defaultPaperSize,
        pageOrientation,
        defaultCardSize,
        "portrait",
        defaultPageMarginsMm,
        defaultBleedMm,
        defaultBleedMm / 2
    );
    return cardsPerPage;
};

export const useChunkedPagesProps = (): Omit<ChunkedPagesProps<any, any>, "Component" | "items"> => {
    const {
        defaultPaperSize,
        isDefaultPaperOrientationPortrait,
        defaultPageMarginsMm,
        defaultGapMm,
        pageLabelPosition,
        showHorizontalBend,
    } = usePrintControlsStore();
    const pageOrientation = isDefaultPaperOrientationPortrait ? ("portrait" as const) : ("landscape" as const);

    const cardsPerPage = useCardsPerPage();

    return {
        itemsPerPage: cardsPerPage,
        pageContentProps: { style: { gap: `${defaultGapMm[1]}mm ${defaultGapMm[0]}mm` } },
        frontFacePrintPageProps: {
            size: defaultPaperSize,
            orientation: pageOrientation,
            bleedInMm: 0,
            marginsInMm: defaultPageMarginsMm,
            children: (
                <>
                    <RegistrationMark className="absolute top-0 left-0" />
                    {showHorizontalBend && (
                        <div className="HorizontalBend absolute top-1/2 left-0 w-full border-t-[0.2mm] border-dashed border-kac-steel" />
                    )}
                    <ColorBars className="absolute bottom-0 right-4 origin-top-right rotate-90" />
                    <ColorBars className="absolute top-0 left-4 origin-bottom-left rotate-90" />
                    <RegistrationMark className="absolute bottom-0 right-0" />
                </>
            ),
        },
        backFacePrintPageProps: {
            size: defaultPaperSize,
            orientation: pageOrientation,
            bleedInMm: 0,
            marginsInMm: defaultPageMarginsMm,
            children: (
                <>
                    <RegistrationMark className="absolute top-0 left-0" />
                    {showHorizontalBend && (
                        <div className="HorizontalBend absolute top-1/2 left-0 w-full border-t-[0.2mm] border-dashed border-kac-steel" />
                    )}
                    <ColorBars className="absolute bottom-0 right-4 origin-top-right rotate-90" />
                    <ColorBars className="absolute top-0 left-4 origin-bottom-left rotate-90" />
                    <RegistrationMark className="absolute bottom-0 right-0" />
                </>
            ),
        },
        labelPosition: pageLabelPosition,
    };
};

export const useItemAdapter = <T extends AnyRecord>(items: T[]) => {
    const { defaultBleedMm, defaultCardSize, flipSecondHalf } = usePrintControlsStore();
    const cardsPerPage = useCardsPerPage();
    return items.map((item, index) => ({
        ...item,
        bleedMm: defaultBleedMm,
        size: defaultCardSize,
        style: {
            ...(item.style ?? {}),
            rotate: flipSecondHalf && index % cardsPerPage >= cardsPerPage / 2 ? "180deg" : "0deg",
        },
    }));
};
