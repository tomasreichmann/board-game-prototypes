import React from "react";
import { Navigation } from "../Navigation";
import { PerspectiveView } from "../../../../components/perspectiveView/PerspectiveView";

export default function PlayRoute() {
    return (
        <div className="w-full h-full">
            <Navigation className="absolute left-0 top-0 right-0 z-40" />
            <PerspectiveView className="w-full h-full z-0" showGrid targetX={0} targetY={0} targetZ={0}>
                <h1 className="text-3xl absolute left-[0px] top-[0px] -translate-x-1/2 -translate-y-1/2">0x0</h1>
                <h1 className="text-3xl absolute left-[200px] top-[200px] -translate-x-1/2 -translate-y-1/2">
                    200x200
                </h1>
                <h1 className="text-3xl absolute left-[-100px] top-[300px] -translate-x-1/2 -translate-y-1/2">
                    -100x300
                </h1>
            </PerspectiveView>
        </div>
    );
}
