import Print from "@/components/print/Print";
import wineWagesAndWorship from "../../../data/questLines/wineWagesAndWorship";
import Article from "../../content/Article";
import Text, { H1, H2, H3 } from "../../content/Text";
import QuestLineCard from "../../gameComponents/QuestLineCard";
import { Navigation } from "../../Navigation";
import lawVsLiberty from "@/prototypes/kick-ass-cards/data/questLines/lawVsLiberty";
import craftYourFortune from "@/prototypes/kick-ass-cards/data/questLines/craftYourFortune";
import thePlague from "@/prototypes/kick-ass-cards/data/questLines/thePlague";
import BaseSheet from "../../gameComponents/BaseSheet";

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
                            src="/mighty-decks/medieval-assets.jpg"
                            alt="Mighty Decks: Relics of Valor - Assets"
                            className="inline-block max-w-[500px] max-h-[50vh] object-contain m-4 rounded"
                        />
                        <li>
                            <strong>Characters:</strong> Populate your adventures with detailed medieval
                            NPCs—blacksmiths, herbalists, knights, monks, and mischievous townsfolk—to add depth to your
                            world.
                        </li>
                        <img
                            src="/mighty-decks/medieval-actors.jpg"
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
                            <strong>Base Essentials:</strong> Build your own medieval tavern, castle or a dungeon with
                            specialized rooms, staff and exquisite goods to create a lively hub for roleplay and
                            adventure.
                            <br />
                            <img
                                src="/mighty-decks/tavern-example.jpg"
                                alt="Mighty Decks: Relics of Valor - Example Tavern"
                                className="inline-block max-w-[500px] max-h-[50vh] object-contain m-4 rounded"
                            />
                        </li>
                        <li>
                            <strong>Base Quest lines:</strong> Explore fun topics and meaningful decisions with unique
                            plot lines that revolve around your base and its people. Are you going to shelter thieves
                            and build out your own Thief's guild or become a lord by defeating the rebels in the name of
                            the king?
                            <br />
                            {/*                             <img
                                src="/mighty-decks/tavern-example.jpg"
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
                <H2 className="mt-8">Rules for running a business</H2>
                <Article>
                    <p>
                        With Base essentials you can not only build out your dream tavern, castle or a dungeon, but also
                        run it as business.
                    </p>

                    <h3>Player Actions</h3>
                    <ul>
                        <li>
                            Players can spend 2 daily actions (morning and afternoon) to manage their business like
                            buying and selling goods or working in a room.
                        </li>
                        <li>
                            Players may perform a third "push action" by taking 1 Distress card to represent
                            overexertion.
                        </li>
                    </ul>

                    <img
                        src="/mighty-decks/base/tavern-example.jpg"
                        alt="Mighty Decks: Relics of Valor - Example Tavern"
                        className="inline-block max-w-[500px] max-h-[50vh] object-contain m-4 rounded"
                    />

                    <BaseSheet className="not-prose" />

                    <h3>The Base Sheet</h3>
                    <ul>
                        <li>Tracks the setup and status of the business.</li>
                        <li>Each sheet includes 3 rooms, which represent functional areas.</li>
                        <li>Players can expand their base to include multiple Base Sheets.</li>
                    </ul>
                    <p>Example: A tavern may have a "Hall" for serving, "Cellar" for storage, and "Kitchen."</p>

                    <h4>Room Quality</h4>
                    <p>
                        Rooms can have different quality levels which determine their efficiency and cost to construct.
                        Example: A poor quality storage may be just a wooden roof with no walls to store lumber, good
                        quality storage may be a locked room, and excellent quality storage may be a high security
                        vault.
                    </p>
                    <ul>
                        <li>Poor: Simple, low-efficiency operations. 10 money to construct. +1 money income.</li>
                        <li>
                            Good: Decent operations with improved efficiency. 100 money to construct. +10 money income.
                        </li>
                        <li>
                            Excellent: Top-tier operations with peak efficiency. 1000 money to construct. +100 money
                            income.
                        </li>
                    </ul>

                    <h4>Tracking Goods and Resources</h4>
                    <ul>
                        <li>
                            Goods: Represented by Counter or Asset cards with dice on them to track the amount of units.
                        </li>
                        <li>Effects: Represent improvements, damage, or other situational modifiers.</li>
                        <li>Actors: Employees or other individuals working in the room.</li>
                    </ul>

                    <h3>Buying and Selling Goods</h3>
                    <p>
                        Goods are measured in units, with each unit representing 1 day’s worth of spent or sold goods.
                    </p>
                    <p>
                        Players can spend their daily action to play an Outcome card when purchasing 10+ units to get a
                        better deal.
                    </p>
                    <p>
                        Selling Goods depletes the supply and earns revenue based on the quality of goods, the room, and
                        the seller’s skill.
                    </p>

                    <h4>Example</h4>
                    <ul>
                        <li>A Success allows buying 10 units for 8 money or 12 units for 10 money.</li>
                        <li>A Partial Success allows buying 10 units for 9 money.</li>
                        <li>A Fumble increases the cost or reduces the quantity available.</li>
                    </ul>

                    <h4>Quality</h4>

                    <ul>
                        <li>Poor Goods: Cheapest and most basic. Costs 1 money per unit.</li>
                        <li>Good Goods: Standard, better for mid-range clientele. Costs 10 money per unit.</li>
                        <li>Excellent Goods: High-end, luxury items. Costs 100 money per unit.</li>
                    </ul>

                    <h3>Income from Rooms</h3>
                    <p>
                        Rooms can be rented requiring no staff or goods, operated by employees, producing goods or
                        providing services by using up resources.
                    </p>

                    <h4>Renting Rooms</h4>
                    <ul>
                        <li>Poor: Costs 10 money to build, earns 1 money per day.</li>
                        <li>Good: Costs 100 money to build, earns 10 money per day.</li>
                        <li>Excellent: Costs 1000 money to build, earns 100 money per day.</li>
                    </ul>

                    <h3>Providing Services by Players</h3>

                    <p>Players may work in a room to earn income by:</p>
                    <ul>
                        <li>Spending an action and playing an Outcome card to determine income.</li>
                        <li>Or use no Outcome card and earn a fixed 1 + room quality money.</li>
                    </ul>

                    <p>Example: Success in a poor room = 3 money (2 base + 1 room quality).</p>

                    <h4>Hiring Employees</h4>
                    <p>Players can hire or train employees to earn a fixed income based on the employee quality.</p>
                    <ul>
                        <li>Poor: Costs 10 money to train/equip, earns 1 money/day.</li>
                        <li>Good: Costs 100 money to train/equip, earns 10 money/day.</li>
                        <li>Excellent: Costs 1000 money to train/equip, earns 100 money/day.</li>
                    </ul>

                    <h4>Employee traits</h4>
                    <p>Employees may have traits:</p>

                    <ul>
                        <li>Positive: Efficient, charismatic, skilled.</li>
                        <li>Negative: Lazy, greedy, rude.</li>
                        <li>
                            Traits modify daily operations: Example: A "Fast Worker" can sell +1 unit of goods per day.
                        </li>
                    </ul>

                    <h3>Selling or producing Goods</h3>
                    <p>
                        Selling Goods earns revenue based on the quality of the goods, the room, and the seller. Revenue
                        = Goods Quality + Room Quality + Seller Quality.
                    </p>
                    <p>
                        Example: Selling poor beer in a poor room with a poor bartender = 1 + 1 + 1 = 3 money per day
                        and costs 1 unit of beer.
                    </p>
                    <p>
                        Higher-quality goods in mismatched rooms or by mismatched employees: The default formula
                        applies, but the Storyteller may adjust for narrative opportunities.
                    </p>

                    <h4>Quality of Goods</h4>
                    <p>Goods cost the same to buy and sell at their respective quality:</p>
                    <ul>
                        <li>Poor: Buy and sell for 1 money/unit.</li>
                        <li>Good: Buy and sell for 10 money/unit.</li>
                        <li>Excellent: Buy and sell for 100 money/unit.</li>
                    </ul>
                    <p>
                        Narrative adjustments: Selling high-quality goods in poor rooms may attract unusual clients,
                        create conflicts, or earn prestige at the Storyteller's discretion.
                    </p>
                </Article>
                <Print>
                    <QuestLineCard {...wineWagesAndWorship} forPrint />
                </Print>
                <Print>
                    <QuestLineCard {...lawVsLiberty} forPrint />
                </Print>
                <Print>
                    <QuestLineCard {...craftYourFortune} forPrint />
                </Print>
                <Print>
                    <QuestLineCard {...thePlague} forPrint />
                </Print>
                <Print>
                    <BaseSheet bleedMm={1} />
                    <BaseSheet bleedMm={1} backgroundUri="/mighty-decks/base/cellar.png" />
                </Print>
                <Print>
                    <BaseSheet bleedMm={1} backgroundUri="/mighty-decks/base/castle.png" />
                    <BaseSheet bleedMm={1} backgroundUri="/mighty-decks/base/caves.png" />
                </Print>
            </div>
        </>
    );
}
