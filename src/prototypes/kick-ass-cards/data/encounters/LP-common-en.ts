export const defaultClockProps = {
    size: "Bridge",
    className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
};
export const defaultActorProps = {
    size: "Bridge",
    className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
    imagePosition: "center top",
};
export const defaultEffectProps = {
    size: "Mini European",
    className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
};
export const defaultAssetProps = {
    size: "Mini European",
    className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
};
export const defaultMiniProps = {
    baseClassName: "pt-2 bg-kac-blood-dark text-white text-center",
    backBaseClassName: "pt-2 bg-kac-blood-dark text-white text-center",
    baseWidth: "0.5in",
    height: "2in",
    width: "1in",
};

export const characters = {
    aia: {
        imageUri: "/LP/Aia.png",
        name: "Aia",
        occupation: "Head Researcher, Geneticist",
        notes: "Aia is the team leader and a renowned geneticist. She has increased intelligence and problem-solving abilities, as well as heightened senses and physical strength. However, she has a tendency to be overly competitive and can be ruthless in her goals. Her hidden talent is that she is a skilled musician and has a beautiful voice.",
    },
    ela: {
        imageUri: "/LP/Ela.png",
        name: "Ela",
        occupation: "Doctor",
        notes: "Ela is a doctor and a team expert in physiological modifications. She has increased healing abilities and strong resistance to diseases. Her hidden weakness is that she has a weakness for sweets and sometimes indulges in them when no one is around. Her hidden talent is that she is a talented artist and has a natural gift for drawing and painting.",
    },
    isa: {
        imageUri: "/LP/Isa.png",
        name: "Isa",
        occupation: "IT Specialist",
        notes: "Isa is a computer scientist and a team expert in hacking. She has increased information processing speed and memory and can directly interface with technology using her mind. She can be too trusting and has fallen for scams several times. She is a skilled fighter and has won many tournaments.",
    },
    opa: {
        imageUri: "/LP/Opa.png",
        name: "Opa",
        occupation: "Botanist",
        notes: "Opa is a botanist and a team expert in plant genetics. She has the ability to photosynthesize and communicate with plants telepathically. Her hidden weakness is that she has a gambling addiction and has bet on everything from card games to sports several times. Her hidden talent is that she is a skilled cook and can prepare a variety of delicious dishes.",
    },
    una: {
        imageUri: "/LP/Una.png",
        name: "Una",
        occupation: "Geologist",
        notes: "Una is a geologist and a team expert in terraforming. She has increased endurance and the ability to survive in extreme conditions. Her weakness is that she can be prone to anger and can be quick to anger. Her hidden talent is that she is a talented dancer and has won many awards for her performances.",
    },
    victor: {
        imageUri: "/LP/viktor.png",
        name: "Victor",
        occupation: "Ship Engineer",
        notes: "Confidence 0/4",
    },
};

export const items = {
    medi_gel: {
        icon: "/LP/icons/injection.png",
        title: "Medi-gel",
        effect: "Repairs organic damage",
    },
    nano_gel: {
        icon: "/LP/icons/tube.png",
        title: "Nano-gel",
        effect: "Repairs mechanical damage",
    },
    instahack: {
        icon: "/LP/icons/gadget.png",
        title: "Instahack",
        effect: "Temporarily gains control over a device for 1 turn",
    },
    grapple_gun: {
        icon: "/LP/icons/rifle.png",
        title: "Grapple gun",
        effect: "Shoots a grappling hook and pulls to the target",
    },
    gluenade: {
        icon: "/LP/icons/bag.png",
        title: "Gluenade",
        effect: "Grenade that sticks everything in the zone for 1 turn",
    },
    emp_grenade: {
        icon: "/LP/icons/capsule.png",
        title: "EMP grenade",
        effect: "Grenade that temporarily disables all electronics in the zone for 1 turn",
    },
};

export const clocks = {
    researcher_respect: {
        title: "Building respect for Viktor among the researchers",
        reward: "Mental stim - 2 actions",
        current: 0,
        total: 6,
    },
    calm_down_the_researchers: {
        title: "Calm down the researchers",
        reward: "Consumable",
        current: 0,
        total: 6,
    },
    crew_reputation: {
        title: "Crew reputation",
        reward: "Each: Magnetic chip",
        threat: "Title: Damn hooligans",
        current: 3,
        total: 6,
    },
};
