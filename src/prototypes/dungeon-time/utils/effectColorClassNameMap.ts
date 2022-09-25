import { IconType } from "../components/Icon/Icon";

const effectColorClassNameMap: { [key in IconType]?: string } = {
    ACTION: "text-lightning-3",
    BARRIER: "text-slate-400",
    BLOCK: "text-lightning-2",
    FREEZE: "text-fire-2",
    MELEE: "text-blood-1",
    MOVE: "text-acid-1",
    RANGE: "text-blood-1",
    SHOVE: "text-curse-2",
    TRAP: "text-acid-1",
    PIN: "text-curse-1",
};
export default effectColorClassNameMap;
