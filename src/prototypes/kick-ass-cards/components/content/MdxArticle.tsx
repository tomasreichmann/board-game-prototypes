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
import Toggle from "../../../../components/Toggle";
import Aside from "./Aside";
import Mdx from "./Mdx";
import Text from "./Text";
import Button from "../controls/Button";
import BroadcastCounter from "../screenContent/BroadcastCounter";
import BroadcastGenericCounterCard from "../screenContent/BroadcastGenericCounterCard";
import BroadcastStuntCard from "../screenContent/BroadcastStuntCard";
import BroadcastActorCardWithTacticalOverlay from "../screenContent/BroadcastActorCardWithTacticalOverlay";
import { Link } from "react-router-dom";
import ComponentHelper from "../gameComponents/ComponentHelper";

export type MdxComponent = React.ComponentType<{
    components: {
        [key: string]: React.ComponentType<any>;
    };
}>;

export type MdxArticleProps = GenericMdxArticleProps;

const A = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, ...rest } = props;
    const isInternal = href && (href.startsWith("/") || href.startsWith("#"));
    return isInternal ? <Link to={href} {...rest} /> : <a {...rest} target="_blank" rel="noopener noreferrer" />;
};

export const defaultMdxComponentMap = {
    a: A,
    Alert,
    Aside,
    List: ComponentList,
    p: Paragraph,
    Button,
    li: ListItem,
    Columns,
    Hand,
    Outcome: OutcomeCard,
    img: EncounterImage,
    Image: EncounterImage,
    Heading: BroadcastHeading,
    Player: ReactPlayer,
    Spread,
    Actor: BroadcastActor,
    ActorCardWithTacticalOverlay: BroadcastActorCardWithTacticalOverlay,
    Asset: BroadcastAsset,
    Effect: BroadcastEffect,
    Clock: BroadcastClock,
    CounterCard: BroadcastCounter,
    StuntCard: BroadcastStuntCard,
    GenericCounterCard: BroadcastGenericCounterCard,
    Paper: BroadcastPaper,
    PaperMini: BroadcastPaperMini,
    ComponentHelper,
    Mdx,
    Text,
    Toggle,
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
