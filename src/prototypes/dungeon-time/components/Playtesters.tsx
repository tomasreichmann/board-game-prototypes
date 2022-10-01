import { usePlaytesters } from "../hooks/usePlaytesters";

export default function Playtesters() {
    const { data } = usePlaytesters();
    return (
        <div className="mt-5 print:hidden">
            <h2 className="font-dtHeading text-lg text-lightning-3">Playtesters</h2>
            <p>{data?.map(({ name }) => name).join(", ")}</p>
        </div>
    );
}
