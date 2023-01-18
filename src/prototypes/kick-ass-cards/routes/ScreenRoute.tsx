import React from "react";
import { Outlet } from "react-router-dom";
import { useBroadcastData } from "../services/broadcastScreen";
import DataToggle from "../../../components/DataToggle";
import ScreenContentWrapper from "../components/screenContent/ScreenContentWrapper";
import ErrorBoundary from "../../../components/ErrorBoundary";

export default function ScreenRoute() {
    const { storeData } = useBroadcastData();

    return (
        <>
            <div className="print:relative print:w-auto print:h-auto absolute left-0 top-0 w-screen h-screen flex justify-center items-center flex-wrap">
                {storeData.content.map(({ props, type }, contentIndex) => {
                    console.log({ props });
                    return (
                        <ErrorBoundary key={contentIndex}>
                            <ScreenContentWrapper props={props} type={type} />
                        </ErrorBoundary>
                    );
                })}
                <DataToggle data={storeData} className="absolute left-0 bottom-0" initialCollapsed />
            </div>
            <Outlet />
        </>
    );
}
