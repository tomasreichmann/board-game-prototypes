import { DialogStateType } from "../GameContext";

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
                    children: "Stay a while longer",
                    action: {
                        changeNodeId: "stayLonger",
                        setFlags: { finishedDeFragmentation: true },
                    },
                },
                {
                    component: "Action",
                    children: "95% is enough. Let's move on.",
                    action: {
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
                        "You are not in a rush to get up. Better finish the de-fragmentation process before moving on. You don't want to get a lag during your job interview.",
                },
            ],
        },
    },
};

export default newGameDialog;
