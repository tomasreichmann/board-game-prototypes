import { Outlet } from "react-router-dom";
import { ScreenContentTypeEnum, useBroadcastData } from "../services/broadcastScreen";
import DataToggle from "../../../components/DataToggle";
import ScreenContentImage from "../components/screenContent/ScreenContentImage";

export const contentTypeMap = {
    [ScreenContentTypeEnum.Image]: ScreenContentImage,
};

export default function ScreenRoute() {
    const { storeData } = useBroadcastData();

    return (
        <>
            <div className="absolute left-0 top-0 -z-10 w-screen h-screen " style={storeData.style}>
                {storeData.content.map(({ type, id, ...contentProps }) => {
                    return <ScreenContentImage key={id} {...contentProps} />;
                })}
                <DataToggle data={storeData} className="absolute left-0 bottom-0" initialCollapsed />
            </div>
            <Outlet />
        </>
    );
}
