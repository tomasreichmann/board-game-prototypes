import playtesters from "../data/playtesters.csv";

export default function Playtesters() {
    return (
        <div className="mt-5 print:hidden">
            <h2 className="font-kacHeading text-lg text-kac-monster">Playtesters</h2>
            <p>{playtesters.map(({ name }) => name).join(", ")}</p>
        </div>
    );
}
