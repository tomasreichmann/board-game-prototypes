import prototypes from "../prototypes/prototypes";
import { Button } from "react-daisyui";
import Page from "../components/Page/Page";

// import "./Component.css";

export default function IndexRoute() {
    return (
        <Page className="IndexRoute">
            <h1 className="text-3l font-bold mb-4">Prototypes</h1>
            <div>
                <p>This page contains several prototypes of games. Check it out.</p>
                <p>
                    Feel free to reach out to me at{" "}
                    <a href={"mailto:tomasreichmann" + "@" + "gmail.com"}>{"tomasreichmann" + "@" + "gmail.com"}</a>
                </p>
            </div>
        </Page>
    );
}
