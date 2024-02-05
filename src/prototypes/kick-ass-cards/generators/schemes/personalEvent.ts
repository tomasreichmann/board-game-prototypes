import { DeepRandomMultipleType, DeepRandomType, ReferenceConditionType } from "../resolveRandom";
import personScheme, { GenderEnum, PersonType } from "./personScheme";
// import childEventsData from "../../data/child-events-cs-cleaned";

const babyBornEvent: DeepRandomType<string> = {
    _rTemplate: "${mothersFirstName} ${mothersLastName} has given birth to a baby ${babyGender}",
    _variables: {
        mothersFirstName: "mothersFirstName",
        mothersLastName: "mothersLastName",
        babyGender: "babyGender",
    },
};

export enum LifeEventTypeEnum {
    PersonBorn = "PersonBorn",
    PersonAppeared = "PersonAppeared",
    PersonMet = "PersonMet",
    PersonDied = "PersonDied",
}

export type LifeEventType = {
    date?: string;
    type: LifeEventTypeEnum;
    person: Partial<PersonType>;
    description: string;
};

export const personAppearedEvent: DeepRandomType<LifeEventType> = {
    _rObject: {
        type: LifeEventTypeEnum.PersonAppeared,
        person: personScheme,
        description: {
            _rTemplate: "Kde se ${vzal}, tu se ${vzal} ",
            _variables: {
                firstName: "firstName",
                lastName: "lastName",
                vzal: {
                    _rArray: [
                        { _rValue: "vzal", _prop: "person.gender", _equals: GenderEnum.Male },
                        { _rValue: "vzala", _prop: "person.gender", _equals: GenderEnum.Female },
                    ],
                },
            },
        },
    },
};

const lifeEventScheme = {
    _rObject: {},
};
export default lifeEventScheme;
