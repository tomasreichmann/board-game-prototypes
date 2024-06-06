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
            children: showHorizontalBend ? (
                <div className="HorizontalBend absolute top-1/2 left-0 w-full border-t-[0.1mm] border-dashed" />
            ) : undefined,
        },
        backFacePrintPageProps: {
            size: defaultPaperSize,
            orientation: pageOrientation,
            bleedInMm: 0,
            marginsInMm: defaultPageMarginsMm,
            children: showHorizontalBend ? (
                <div className="HorizontalBend absolute top-1/2 left-0 w-full border-t-[0.1mm] border-dashed" />
            ) : undefined,
        },
        labelPosition: pageLabelPosition,
    };
};

export const useItemAdapter = <T extends AnyRecord>(items: T[]) => {
    const { defaultBleedMm, defaultCardSize } = usePrintControlsStore();
    const cardsPerPage = useCardsPerPage();
    return items.map((item, index) => ({
        ...item,
        bleedMm: defaultBleedMm,
        size: defaultCardSize,
        style: { ...(item.style ?? {}), rotate: index % cardsPerPage >= cardsPerPage / 2 ? "180deg" : "0deg" },
    }));
};
