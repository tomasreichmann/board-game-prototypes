import wineWagesAndWorship from "../../../data/questLines/wineWagesAndWorship";
import Article from "../../content/Article";
import Text, { H1, H2, H3 } from "../../content/Text";
import QuestLineCard from "../../gameComponents/QuestLineCard";
import { Navigation } from "../../Navigation";

export default function RelicsOfValorRoute() {
    return (
        <>
            <Navigation />
            <div className="print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
                <H1>Mighty Decks: Relics of Valor</H1>
                <Article>
                    <p>
                        Immerse yourself in the gritty and captivating world of 15th-century medieval Bohemia with{" "}
                        <strong>Relics of Valor</strong>, a thematic expansion for the Mighty Decks system. From
                        bustling town squares to sacred monasteries, this set enriches your games with authentic
                        medieval flavor and thrilling stories.
                    </p>
                    <h2>Features</h2>
                    <ul>
                        <li>
                            <strong>Medieval Assets:</strong> Equip your heroes with medieval-themed gear, including
                            weapons, armor, and resources inspired by the era.
                        </li>

                        <img
                            src="/KAC/medieval-assets.jpg"
                            alt="Mighty Decks: Relics of Valor - Assets"
                            className="inline-block max-w-[500px] max-h-[50vh] object-contain m-4 rounded"
                        />
                        <li>
                            <strong>Characters:</strong> Populate your adventures with detailed medieval
                            NPCs—blacksmiths, herbalists, knights, monks, and mischievous townsfolk—to add depth to your
                            world.
                        </li>
                        <img
                            src="/KAC/medieval-actors.jpg"
                            alt="Mighty Decks: Relics of Valor - Actors"
                            className="inline-block max-w-[500px] max-h-[50vh] object-contain m-4 rounded"
                        />
                        <li>
                            <strong>Three One-Shot Adventures:</strong>
                            <ul>
                                <li>
                                    <strong>"Penance in Blood":</strong> A horror adventure where players, as Hussite
                                    heroes, must navigate a monastery bustling with patients to gain the favor of the
                                    renowned physician Abbot Radomír and save their commander’s life. Service and
                                    sacrifice take center stage in this grim tale.
                                </li>
                                <li>
                                    <strong>"Thou Shalt Not Prank":</strong> A lively romp through medieval Pilsen where
                                    a group of mischievous kids uncover the dirty deeds of Father Zdislav. From sneaky
                                    escapades in the church to a chaotic chase through the marketplace, it’s a
                                    laugh-filled, high-stakes mission to expose the priest during Sunday Mass.
                                </li>
                                <li>
                                    <strong>"The Hidden Hand of Strahov":</strong> A historical mystery adventure set in
                                    the shadowed halls of Strahov Monastery. Investigators unravel a web of secrets,
                                    lies, and betrayal in search of the missing Hand of Saint Norbert. Expect moral
                                    dilemmas, cryptic clues, and tense interrogations in this atmospheric tale of faith
                                    and ambition.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>Tavern Essentials:</strong> Build your own medieval tavern with specialized rooms,
                            staff and delicious products to create a lively hub for roleplay.
                            <br />
                            <img
                                src="/KAC/tavern-example.jpg"
                                alt="Mighty Decks: Relics of Valor - Example Tavern"
                                className="inline-block max-w-[500px] max-h-[50vh] object-contain m-4 rounded"
                            />
                        </li>
                        <li>
                            <strong>Tavern Quest lines:</strong> Explore fun topics and meaningful decisions with 6 plot
                            lines that revolve around your tavern and its patrons. Are you going to shelter thieves and
                            build out your own Thief's guild or become a lord by defeating the rebels in the name of the
                            king?
                            <br />
                            {/*                             <img
                                src="/KAC/tavern-example.jpg"
                                alt="Mighty Decks: Relics of Valor - Example Tavern"
                                className="inline-block max-w-[500px] max-h-[50vh] object-contain m-4 rounded"
                            /> */}
                        </li>
                    </ul>
                    <p>
                        From epic horror to mischievous comedy and intricate mysteries, <strong>Relics of Valor</strong>{" "}
                        provides everything you need for unforgettable medieval adventures. Pair it with the Mighty
                        Decks base game and bring a piece of history to your table!
                    </p>
                </Article>

                <QuestLineCard {...wineWagesAndWorship} />
            </div>
        </>
    );
}
