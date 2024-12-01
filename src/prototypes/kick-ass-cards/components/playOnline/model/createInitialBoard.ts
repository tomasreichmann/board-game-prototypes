import { range, shuffle } from "lodash";
import outcomes from "../../../data/outcomeDeck";
import { ContentItemType, ContentItemTypeEnum, FocusModeEnum, GameDocType, LayoutType, LayoutTypeEnum } from "./types";
import { cardSizes } from "../../../../../components/print/paperSizes";
import mmToPx from "../../../../../utils/mmToPx";
import { getCenterPan } from "../../../../../components/PerspectiveView/utils";
import { PositionProps } from "../../../../../components/PerspectiveView/Position";

export const createOutcomeDeck = () => {};

const [outcomeCardSizeWidthMm, outcomeCardSizeHeightMm] = cardSizes["Mini European"].mm;
export const outcomeCardSize = {
    width: mmToPx(outcomeCardSizeWidthMm),
    height: mmToPx(outcomeCardSizeHeightMm),
};

export const cardMargin = 40;

export default function createInitialBoard(
    game: GameDocType,
    stageWidth = 1920,
    stageHeight = 1080
): Partial<GameDocType> {
    // Generate stacks of Outcome cards for each player
    const layouts: GameDocType["layouts"] = [];

    const viewRotateX = 40;

    const focus: GameDocType["focus"] = {
        at: "defaultView",
        mode: FocusModeEnum.Contain,
    };

    const debugPositions = [] as PositionProps[];

    const horizontalSpaceForOutcomeDeckAndDiscard = (outcomeCardSize.width + cardMargin) * 2 + cardMargin;
    const currentUserHandSize = {
        width: stageWidth - horizontalSpaceForOutcomeDeckAndDiscard,
        height: outcomeCardSize.height,
    };
    const currentUserHandProps = {
        id: "currentUserHand",
        className: "border-2 border-kac-gold-dark pointer-events-none",
        x: horizontalSpaceForOutcomeDeckAndDiscard,
        y: stageHeight - outcomeCardSize.height / 2,
        z: outcomeCardSize.height / 3,
        rotateX: -(viewRotateX || 0),
        ...currentUserHandSize,
    };
    debugPositions.push(currentUserHandProps);

    const currentUserTableSize = {
        width: stageWidth,
        height: outcomeCardSize.height,
    };
    const currentUserTableProps = {
        id: "currentUserTable",
        className: "border-2 border-kac-gold-dark pointer-events-none",
        x: 0,
        y: stageHeight - currentUserTableSize.height,
        z: 0,
        ...currentUserTableSize,
    };
    debugPositions.push(currentUserTableProps);

    const otherPlayerHandsSize = {
        width: stageWidth,
        height: outcomeCardSize.height,
    };
    const otherPlayerHandsProps = {
        id: "otherPlayerHands",
        className: "border-2 border-kac-cloth-dark pointer-events-none",
        x: 0,
        y: -otherPlayerHandsSize.height,
        z: 80,
        rotateX: -(viewRotateX || 0),
        ...otherPlayerHandsSize,
    };
    debugPositions.push(otherPlayerHandsProps);

    const otherPlayerTablesSize = {
        width: stageWidth,
        height: outcomeCardSize.height,
    };
    const otherPlayerTablesProps = {
        id: "otherPlayerTables",
        className: "border-2 border-kac-cloth-dark pointer-events-none",
        x: 0,
        y: 0,
        z: 0,
        ...otherPlayerTablesSize,
    };
    debugPositions.push(otherPlayerTablesProps);

    const playerCount = game.playerIds?.length ?? 0;

    const centerTableSize = {
        width: stageWidth,
        height: stageHeight - currentUserTableSize.height - otherPlayerTablesSize.height,
    };
    const centerTableProps = {
        id: "centerTable",
        className: "border-2 border-kac-monster-dark pointer-events-none",
        x: 0,
        y: otherPlayerTablesSize.height,
        z: 0,
        ...centerTableSize,
    };
    debugPositions.push(centerTableProps);

    const rotateSizeCoefficient = 0.9;

    const defaultViewSize = {
        width: stageWidth * 1.25,
        height: stageHeight * rotateSizeCoefficient * 1.5,
    };
    const defaultViewProps = {
        id: "defaultView",
        className: "border-2 border-kac-steel-dark pointer-events-none pointer-events-none",
        x: stageWidth / 2 - defaultViewSize.width / 2,
        y: 0,
        z: 100,
        rotateX: -40,
        ...defaultViewSize,
    };
    debugPositions.push(defaultViewProps);

    const debugLayout: LayoutType = {
        id: "debug",
        type: LayoutTypeEnum.Debug,
        content: [],
    };

    debugLayout.content = debugPositions.map(
        (props) =>
            ({
                id: props.id,
                type: ContentItemTypeEnum.Text,
                componentProps: {
                    children: props.id,
                },
                positionProps: props,
            } as ContentItemType)
    );

    layouts.push(debugLayout);

    const miscLayout: LayoutType = {
        id: "misc",
        type: LayoutTypeEnum.Misc,
        content: [],
    };

    const tableTopProps = {
        id: "tableTop",
        x: -cardMargin,
        y: -cardMargin,
        z: -1,
        width: stageWidth + cardMargin * 2,
        height: stageHeight + cardMargin * 2,
        className: "bg-kac-bone-light pointer-events-none",
    };
    miscLayout.content.push({
        id: tableTopProps.id,
        type: ContentItemTypeEnum.Div,
        componentProps: {
            className: "h-full w-full",
            style: {
                backgroundImage: "url('/KAC/mighty_decks_logo.png'), url('/wood3.jpg')",
                backgroundSize: "25%, 50%",
                backgroundRepeat: "no-repeat, repeat",
                backgroundPosition: "center center, center center",
                filter: "brightness(130%) saturate(50%)",
            },
        },
        positionProps: tableTopProps,
    });
    const tableEdgeProps = {
        id: "tableEdge",
        x: -cardMargin,
        y: stageHeight + cardMargin,
        z: -1,
        transformOrigin: "top center",
        rotateX: -90,
        width: stageWidth + cardMargin * 2,
        height: cardMargin * 2,
        className: "bg-kac-bone-dark pointer-events-none",
    };
    miscLayout.content.push({
        id: tableEdgeProps.id,
        type: ContentItemTypeEnum.Div,
        componentProps: {
            className: "h-full w-full",
            style: {
                backgroundImage: "url('/wood3.jpg')",
                backgroundSize: "50%",
                backgroundRepeat: "repeat",
                backgroundPosition: "center center",
                filter: "brightness(80%) saturate(50%)",
            },
        },
        positionProps: tableEdgeProps,
    });
    layouts.push(miscLayout);

    const playerOutcomes = range(0, playerCount).map((playerIndex) =>
        shuffle(
            outcomes.map(
                (outcome) =>
                    ({
                        id: `player-${playerIndex}-${outcome.slug}`,
                        type: ContentItemTypeEnum.OutcomeCard,
                        componentProps: { ...outcome, slug: `player-${playerIndex}-${outcome.slug}` },
                        positionProps: outcomeCardSize,
                    } as ContentItemType)
            )
        )
    );

    const initialCardsInHand = 3;

    // Hands
    range(0, playerCount).forEach((playerIndex) => {
        const playerUid = game.playerIds?.[playerIndex];
        if (!playerUid) {
            throw new Error("Player UID not found");
        }
        layouts.push({
            id: playerUid,
            ownerId: playerUid,
            type: LayoutTypeEnum.Hand,
            content: playerOutcomes[playerIndex].slice(0, initialCardsInHand).map((content) => ({
                ...content,
                isClickableForOwner: true,
                ownerUid: playerUid,
            })),
        });
    });

    // Decks
    range(0, playerCount).forEach((playerIndex) => {
        const playerUid = game.playerIds?.[playerIndex];
        if (!playerUid) {
            throw new Error("Player UID not found");
        }
        layouts.push({
            id: playerUid,
            ownerId: playerUid,
            type: LayoutTypeEnum.Deck,
            content: playerOutcomes[playerIndex]
                .slice(initialCardsInHand)
                .map((content, contentIndex, playerOutcomes) => {
                    const isLast = contentIndex === playerOutcomes.length - 1;
                    return {
                        ...content,
                        componentProps: { ...content.componentProps, isFaceDown: true },
                        isClickableForOwner: isLast,
                        ownerUid: playerUid,
                    };
                }),
        });
    });

    // Discards
    range(0, playerCount).forEach((playerIndex) => {
        const playerUid = game.playerIds?.[playerIndex];
        if (!playerUid) {
            throw new Error("Player UID not found");
        }
        layouts.push({
            id: playerUid,
            ownerId: playerUid,
            type: LayoutTypeEnum.Discard,
            content: [],
        });
    });

    debugLayout.content.push({
        id: "flippable-test",
        type: ContentItemTypeEnum.FlippableTest,
        componentProps: {},
        positionProps: { id: "flippable-test", x: 0, y: stageHeight / 3, z: 0 },
    });

    return { ...game, layouts: layouts, focus, stageWidth, stageHeight };
}
