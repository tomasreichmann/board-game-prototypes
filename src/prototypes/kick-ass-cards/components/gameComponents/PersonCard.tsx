import { Person } from "../../generators/generatePerson";
import BroadcastActor from "../screenContent/BroadcastActor";

const PersonCard = ({ firstName, lastName, age, isAlive, ...restPerson }: Partial<Person>) => {
    const deadLabel = isAlive ? "" : `✝`;
    const ageLabel = age !== undefined ? ` (${deadLabel}${age})` : "";
    return (
        <div>
            <BroadcastActor
                size="Mini US game"
                name={`${firstName} ${lastName}${ageLabel}`}
                {...restPerson}
                className="shadow"
            />
        </div>
    );
};

export default PersonCard;
