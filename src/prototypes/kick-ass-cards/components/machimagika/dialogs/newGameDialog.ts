import { SceneEnum } from "../scenes/sceneModel";
import { DialogStateType } from "../dialog/dialogModel";

const newGameDialog: DialogStateType = {
    id: "newGame",
    currentNodeId: "start",
    nodeMap: {
        start: {
            id: "start",
            content: [
                {
                    component: "Introspection",
                    children:
                        "Curious. Even though wading into the cold salty water of the see would most certainly cause you a very quick, corrosive and permanent shutdown, it feels like looking over the constantly shifting surface of the water is speeding up your de-fragmentation process.",
                },
                {
                    component: "Introspection",
                    children:
                        "You've been sitting here for so many ticks, the angle of the sun has noticeably shifted and covered everything with a pinkish film. You are almost ready to move.",
                },
                {
                    component: "Action",
                    children: "Stay a while longer and enjoy the sunset",
                    action: {
                        id: "stayLonger",
                        changeNodeId: "stayLonger",
                        setFlags: { watchedSunset: true },
                    },
                },
                {
                    component: "Action",
                    children: "95% is enough. Let's move on.",
                    action: {
                        id: "leave",
                        changeNodeId: "leave",
                    },
                },
            ],
        },
        stayLonger: {
            id: "stayLonger",
            content: [
                {
                    component: "Introspection",
                    children:
                        "You are not in a rush to get up. Better finish the de-fragmentation process before moving on. You don't want to get a lag during your job interview. But more importantly, it would be a crime to miss this beautiful sunset. You don't get to see Demina, the smaller of two moons, casting a shadow over the golden disk of setting sun.",
                },
                {
                    component: "Introspection",
                    children:
                        "Aah yes, the last spark of the sun is swallowed by the see. Only Domina's blue circle will guide you through the approaching night.",
                },
                {
                    component: "Action",
                    children: "It's time to move.",
                    action: {
                        id: "leave",
                        changeNodeId: "leave",
                    },
                },
            ],
        },
        leave: {
            id: "leave",
            content: [
                {
                    component: "Introspection",
                    children: "You stand up, stretch your servos and brush off sand from your legs.",
                },
                {
                    component: "Introspection",
                    children: "The archeologist will be waiting in the tavern by now.",
                },
                {
                    component: "Action",
                    children: "Go to the tavern.",
                    action: {
                        id: "goToTavern",
                        scene: SceneEnum.Location,
                        locationId: "tavern",
                        delayMs: 1000,
                    },
                },
            ],
        },
    },
};

export default newGameDialog;
