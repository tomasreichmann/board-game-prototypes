import react, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

import "./KickAssCardsPrototype.css";
import ClerkProvider from "../../services/Clerk/ClerkProvider";

export default function KickAssCards({ children }: PropsWithChildren) {
    return (
        <ClerkProvider>
            <div
                className="h-screen print:h-auto relative flex flex-col items-stretch overflow-auto bg-kac-blood-dark print:bg-white text-kac-steel-light print:text-kac-steel-dark font-kacBody"
                data-theme="KickAssCardsPrototype"
            >
                <Outlet />
                {children}
            </div>
        </ClerkProvider>
    );
}
