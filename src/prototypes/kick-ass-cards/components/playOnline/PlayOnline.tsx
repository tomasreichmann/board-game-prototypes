import { useUser } from "@clerk/clerk-react";
import { H1 } from "../content/Text";
import { useParams } from "react-router-dom";
import PlayOnlineGame from "./PlayOnlineGame";
import CreateOrJoinGame from "./CreateOrJoinGame";

export default function PlayOnline() {
    const { user } = useUser();
    const { gameId } = useParams();

    if (gameId) {
        return <PlayOnlineGame />;
    }

    return (
        <div className="flex-1 flex flex-col items-stretch print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4 items-center">
                    <H1>Play Online</H1>
                </div>
            </div>

            <CreateOrJoinGame />
        </div>
    );
}
