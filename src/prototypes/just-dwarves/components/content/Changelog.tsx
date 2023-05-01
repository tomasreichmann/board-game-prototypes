import Article from "./Article";
import ChangelogArticle from "./articles/changelog.mdx";

export default function Changelog() {
    return <Article mdx={ChangelogArticle} />;
}
