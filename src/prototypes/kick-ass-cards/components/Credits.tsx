export default function Credits() {
    return (
        <div className="mt-5 print:hidden">
            <h2 className="font-kacHeading text-lg text-kac-monster">Game Design, UX Design, Programming</h2>
            <p>
                <a
                    className="text-kac-curse-light underline hover:no-underline hover:text-kac-curse"
                    href="mailto:tomasreichmann@gmail.com"
                >
                    Tomáš Reichmann
                </a>
                <br />
                Development started 14. 10. 2022
                <br />
                Powered by{" "}
                <a
                    className="text-kac-curse-light underline hover:no-underline hover:text-kac-curse"
                    href="https://github.com/tomasreichmann/board-game-prototypes"
                >
                    Board game prototypes (GitHub)
                </a>
            </p>
        </div>
    );
}
