import { useActions } from "../hooks/useActions";
import { useBattleEncounters } from "../hooks/useBattleEncounters";
import { useConsumables } from "../hooks/useConsumables";
import { useEnemies } from "../hooks/useEnemies";
import useEnemyIntentDeckMap from "../hooks/useEnemyIntentDeckMap";
import { usePlayerCharacters } from "../hooks/usePlayerCharacters";
import { useRelics } from "../hooks/useRelics";
import ActionCard from "./gameComponents/ActionCard";
import BattleEncounterCard from "./gameComponents/BattleEncounterCard";
import ConsumableCard from "./gameComponents/ConsumableCard";
import EnemyCard from "./gameComponents/EnemyCard";
import EnemyIntentCard from "./gameComponents/EnemyIntentCard";
import PlayerCharacterCard from "./gameComponents/PlayerCharacterCard";
import RelicCard from "./gameComponents/RelicCard";
import Icon from "./Icon/Icon";

export default function GameComponents() {
    const { data: actions } = useActions();
    const { data: battleEncounters } = useBattleEncounters();
    const { data: consumables } = useConsumables();
    const { data: enemies } = useEnemies();
    const { data: enemyIntentDeckMap } = useEnemyIntentDeckMap();
    const { data: playerCharacters } = usePlayerCharacters();
    const { data: relics } = useRelics();
    return (
        <div className="mb-5 text-lg flex flex-row flex-wrap gap-x-5 gap-y-5 justify-start items-end">
            {playerCharacters && (
                <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                    <PlayerCharacterCard {...playerCharacters[0]} className="rounded-lg bg-white shadow-md" />
                    <div className="text-md text-center font-dtHeading text-blood-1">
                        {playerCharacters.length} Player Character Cards
                    </div>
                </div>
            )}
            {actions && (
                <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                    <ActionCard {...actions[0]} className="rounded-lg bg-white shadow-md" />
                    <div className="text-md text-center font-dtHeading text-blood-1">
                        {actions.length}&ensp;Action Cards
                    </div>
                </div>
            )}
            {battleEncounters && (
                <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                    <BattleEncounterCard {...battleEncounters[0]} className="rounded-lg bg-white shadow-md" />
                    <div className="text-md text-center font-dtHeading text-blood-1">
                        {battleEncounters.length}&ensp;Battle Encounter Cards
                    </div>
                </div>
            )}
            {consumables && (
                <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                    <ConsumableCard {...consumables[0]} className="rounded-lg bg-white shadow-md" />
                    <div className="text-md text-center font-dtHeading text-blood-1">
                        {consumables.length}&ensp;Consumable Cards
                    </div>
                </div>
            )}
            {enemies && (
                <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                    <EnemyCard {...enemies[0]} className="rounded-lg bg-white shadow-md" />
                    <div className="text-md text-center font-dtHeading text-blood-1">
                        {enemies.length}&ensp;Enemy Cards
                    </div>
                </div>
            )}
            {enemyIntentDeckMap && (
                <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                    <EnemyIntentCard
                        {...enemyIntentDeckMap.basic_deck.intents[0]}
                        className="relative bg-slate-300 rounded-lg shadow-md"
                    >
                        <div className="absolute right-1/2 top-0 bottom-0 flex flex-col justify-center pr-1">
                            <Icon
                                icon={enemyIntentDeckMap.basic_deck?.icon || "HALT"}
                                className="h-7 text-lightning-2"
                            />
                        </div>
                        <div className="absolute left-1/2 top-0 w-1/2 h-full overflow-hidden rotate-180">
                            <EnemyIntentCard
                                key={enemyIntentDeckMap.boss_deck.intents[0]?.slug}
                                {...enemyIntentDeckMap.boss_deck.intents[0]}
                                className="absolute top-0 bg-blood-2"
                            >
                                <div className="absolute right-1/2 top-0 bottom-0 flex flex-col justify-center pr-1">
                                    <Icon
                                        icon={enemyIntentDeckMap.boss_deck?.icon || "HALT"}
                                        className="h-7 text-blood-5"
                                    />
                                </div>
                            </EnemyIntentCard>
                        </div>
                    </EnemyIntentCard>
                    <div className="text-md text-center font-dtHeading text-blood-1">
                        {enemyIntentDeckMap.basic_deck.intents.length}&ensp;Enemy Intent Cards
                    </div>
                </div>
            )}
            {relics && (
                <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                    <RelicCard {...relics[0]} className="rounded-lg bg-white shadow-md" />
                    <div className="text-md text-center font-dtHeading text-blood-1">
                        {relics.length}&ensp;Relic Cards
                    </div>
                </div>
            )}
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">TODO</div>
                <div className="text-md text-center font-dtHeading text-blood-1">1&ensp;Encounter Map</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">TODO</div>
                <div className="text-md text-center font-dtHeading text-blood-1">1&ensp;First Player Token</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">TODO</div>
                <div className="text-md text-center font-dtHeading text-blood-1">1&ensp;Party Token</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">
                    TODO
                    <Icon icon="WOUND" className="m-4 h-12 text-blood-1" />
                </div>
                <div className="text-md text-center font-dtHeading text-blood-1">30&ensp;Wound Tokens</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">
                    TODO
                    <Icon icon="TRAP" className="m-4 h-12 text-acid-1" />
                </div>
                <div className="text-md text-center font-dtHeading text-blood-1">10&ensp;Trap Tokens</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">
                    TODO
                    <Icon icon="BARRIER" className="m-4 h-12 text-slate-500" />
                </div>
                <div className="text-md text-center font-dtHeading text-blood-1">10&ensp;Barrier Tokens</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">
                    TODO
                    <Icon icon="PIN" className="m-4 h-12 text-curse-1" />
                </div>
                <div className="text-md text-center font-dtHeading text-blood-1">5&ensp;Pin Tokens</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">
                    TODO
                    <Icon icon="HIDE" className="m-4 h-12 text-stone-700" />
                </div>
                <div className="text-md text-center font-dtHeading text-blood-1">1&ensp;Hide Token</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">
                    TODO
                    <Icon icon="BLOCK" className="m-4 h-12 text-lightning-3" />
                </div>
                <div className="text-md text-center font-dtHeading text-blood-1">10&ensp;Defend Tokens</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">
                    TODO +1
                    <Icon icon="WOUND" className="m-4 h-12 text-blood-1" />
                </div>
                <div className="text-md text-center font-dtHeading text-blood-1">10&ensp;+1 Wound Tokens</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">
                    TODO
                    <Icon icon="EXPLOSIVE_BARRIER" className="m-4 h-12 text-blood-3" />
                </div>
                <div className="text-md text-center font-dtHeading text-blood-1">3&ensp;Explosive Barrel Tokens</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">TODO</div>
                <div className="text-md text-center font-dtHeading text-blood-1">5&ensp;Mini Color Rings</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">TODO</div>
                <div className="text-md text-center font-dtHeading text-blood-1">12&ensp;Enemy Minis</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">TODO</div>
                <div className="text-md text-center font-dtHeading text-blood-1">6&ensp;Player Minis</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">TODO</div>
                <div className="text-md text-center font-dtHeading text-blood-1">Battle Maps</div>
            </div>
            <div className="break-inside-avoid flex flex-col justify-center items-center gap-2">
                <div className="p-5 text-fuchsia-600">TODO</div>
                <div className="text-md text-center font-dtHeading text-blood-1">
                    Battle Map Hazards and Decorations
                </div>
            </div>
        </div>
    );
}
