import "./KickAssCardsPrototype.css";
import { Route, Routes } from "react-router-dom";
import PrintRoute from "./routes/PrintRoute";

export const kickAssCardsPath = "/kick-ass-cards";

export default function KickAssCards() {
    return (
        <Routes>
            <Route path="/encounters" element={<PrintRoute />} />
            <Route path="/" element={<PrintRoute />} />
        </Routes>
    );
}
