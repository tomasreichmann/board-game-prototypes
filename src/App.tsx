import "./App.css";
import PrintPage from "./components/print/PrintPage/PrintPage";
import { Button } from "react-daisyui";
import DungeonTimePrototype from "./prototypes/dungeon-time/DungeonTimePrototype";

function App() {
    return (
        <div className="App">
            <DungeonTimePrototype />
        </div>
    );
}

export default App;
