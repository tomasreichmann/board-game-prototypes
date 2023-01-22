import React from "react";
import { Outlet } from "react-router-dom";
import { ScreenStoreActionTypeEnum, useBroadcastData } from "../services/broadcastScreen";
import DataToggle from "../../../components/DataToggle";
import ScreenContentWrapper from "../components/screenContent/ScreenContentWrapper";
import ErrorBoundary from "../../../components/ErrorBoundary";
import clsx from "clsx";
import { Button } from "react-daisyui";
import Icon from "../components/Icon";

export type BroadcastRouteProps = { storageKey: string; withPrintMarkerCorners?: boolean };

export default function BroadcastRoute({ storageKey, withPrintMarkerCorners }: BroadcastRouteProps) {
    const { storeData, dispatch } = useBroadcastData(storageKey);

    return (
        <>
            <div
                className={clsx(
                    "print:relative flex-1 flex justify-center items-center content-center flex-wrap",
                    !withPrintMarkerCorners && "gap-2"
                )}
            >
                {storeData.content.map((content) => {
                    return (
                        <ErrorBoundary key={content.id}>
                            <ScreenContentWrapper
                                {...content}
                                key={content.id}
                                withPrintMarkerCorners={withPrintMarkerCorners}
                            >
                                <div className="print:hidden absolute top-2 right-2">
                                    <Button
                                        className="h-auto"
                                        size="xs"
                                        color="secondary"
                                        onClick={() => {
                                            dispatch({
                                                type: ScreenStoreActionTypeEnum.RemoveContent,
                                                id: content.id,
                                            });
                                        }}
                                    >
                                        <span className="text-base leading-3">×</span>
                                    </Button>
                                </div>
                            </ScreenContentWrapper>
                        </ErrorBoundary>
                    );
                })}
            </div>
            <DataToggle data={storeData} className="fixed left-4 bottom-4 " initialCollapsed />
            <Outlet />
        </>
    );
}
