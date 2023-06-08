import Article from "./Article";
import { Alert } from "react-daisyui";
import BroadcastActor from "../screenContent/BroadcastActor";
import BroadcastAsset from "../screenContent/BroadcastAsset";
import BroadcastClock from "../screenContent/BroadcastClock";
import BroadcastEffect from "../screenContent/BroadcastEffect";
import BroadcastHeading from "../screenContent/BroadcastHeading";
import BroadcastPaper from "../screenContent/BroadcastPaper";
import ComponentList from "../ComponentList";
import EncounterImage from "../EncounterImage";
import Hand from "../layout/Hand";
import OutcomeCard from "../gameComponents/OutcomeCard";
import ReactPlayer from "react-player";

import GenericMdxArticle, {
    MdxArticleProps as GenericMdxArticleProps,
} from "../../../../components/content/MdxArticle";
import Columns from "./Columns";

export type MdxComponent = React.ComponentType<{
    components: {
        [key: string]: React.ComponentType<any>;
    };
}>;

export type MdxArticleProps = GenericMdxArticleProps;

const defaultComponentMap = {
    Actor: BroadcastActor,
    Alert,
    Asset: BroadcastAsset,
    Clock: BroadcastClock,
    Columns,
    Effect: BroadcastEffect,
    Hand,
    Heading: BroadcastHeading,
    img: EncounterImage,
    List: ComponentList,
    Outcome: OutcomeCard,
    Paper: BroadcastPaper,
    Player: ReactPlayer,
};

export default function MdxArticle({
    className,
    componentMap = defaultComponentMap,
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
