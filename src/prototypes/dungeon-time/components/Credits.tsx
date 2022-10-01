export default function Credits() {
    return (
        <div className="mt-5 print:hidden">
            <h2 className="font-dtHeading text-lg text-lightning-3">Game Design, UX Design, Programming</h2>
            <p>
                <a
                    className="text-blood-1 underline hover:no-underline hover:text-fire-1"
                    href="mailto:tomasreichmann@gmail.com"
                >
                    Tomáš Reichmann
                </a>
                <br />
                Development started 24. 9. 2022
                <br />
                Powered by{" "}
                <a
                    className="text-blood-1 underline hover:no-underline hover:text-fire-1"
                    href="https://github.com/tomasreichmann/board-game-prototypes"
                >
                    Board game prototypes (GitHub)
                </a>
            </p>
        </div>
    );
}
