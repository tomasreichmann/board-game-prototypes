import prototypes from "../../prototypes/prototypes";
import { Button } from "react-daisyui";
import Page from "../../components/Page/Page";

// import "./Component.css";

export default function IndexRoute() {
    return (
        <Page className="IndexRoute">
            <h1 className="text-3l font-bold mb-10">Prototypes</h1>
            <div className="flex flex-row flex-wrap gap-2">
                {prototypes.map(({ name, path }) => (
                    <Button key={path} href={path}>
                        {name}
                    </Button>
                ))}
            </div>
        </Page>
    );
}
