import { Person } from "../../generators/generatePerson";
import BroadcastActor from "../screenContent/BroadcastActor";

const PersonCard = ({ firstName, lastName, age, isAlive, ...restPerson }: Partial<Person>) => {
    const ageLabel = age !== undefined ? ` (${age})` : "";
    const deadLabel = isAlive ? "" : `💀 `;
    return (
        <div>
            <BroadcastActor
                size="Mini US game"
                name={`${deadLabel}${firstName} ${lastName}${ageLabel}`}
                {...restPerson}
                className="shadow"
            />
        </div>
    );
};

export default PersonCard;
