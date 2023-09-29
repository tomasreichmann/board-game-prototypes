import Article from "./Article";

// required for MDX
import { Alert } from "react-daisyui";
import ReactPlayer from "react-player";
import BroadcastActor from "../screenContent/BroadcastActor";
import BroadcastAsset from "../screenContent/BroadcastAsset";
import BroadcastClock from "../screenContent/BroadcastClock";
import BroadcastEffect from "../screenContent/BroadcastEffect";
import OutcomeCard from "../gameComponents/OutcomeCard";
import Hand from "../layout/Hand";
import EncounterImage from "../EncounterImage";
import ComponentList from "../ComponentList";
import BroadcastPaper from "../screenContent/BroadcastPaper";
import BroadcastHeading from "../screenContent/BroadcastHeading";
import Columns from "../content/Columns";
import Spread from "../layout/Spread";
import BroadcastPaperMini from "../screenContent/BroadcastPaperMini";
import Paragraph from "../Paragraph";
import ListItem from "../ListItem";

import GenericMdxArticle, {
    MdxArticleProps as GenericMdxArticleProps,
} from "../../../../components/content/MdxArticle";

export type MdxComponent = React.ComponentType<{
    components: {
        [key: string]: React.ComponentType<any>;
    };
}>;

export type MdxArticleProps = GenericMdxArticleProps;

export const defaultMdxComponentMap = {
    Alert,
    List: ComponentList,
    p: Paragraph,
    li: ListItem,
    Columns,
    Hand,
    Outcome: OutcomeCard,
    img: EncounterImage as any,
    Heading: BroadcastHeading,
    Player: ReactPlayer,
    Spread,
    Actor: BroadcastActor,
    Asset: BroadcastAsset,
    Effect: BroadcastEffect,
    Clock: BroadcastClock,
    Paper: BroadcastPaper,
    PaperMini: BroadcastPaperMini,
};

export default function MdxArticle({
    className,
    componentMap = defaultMdxComponentMap,
    ArticleComponent = Article,
    mdx,
    children,
}: MdxArticleProps) {
    return (
        
        <GenericMdxArticle
            className={className}
            ArticleComponent={ArticleComponent}
            mdx={mdx}
            componentMap={componentMap}
        >
            {children}
        </GenericMdxArticle>
    );
}
