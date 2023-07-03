import { SceneEnum } from "../scene/sceneModel";
import { DialogType } from "../dialog/dialogModel";
import { GameActionTypeEnum } from "../reducer/GameActionTypeEnum";

const newGameDialog: DialogType = {
    dialogId: "newGame",
    backgroundContent: [
        {
            component: {
                Image: {
                    src: "/MM/sunset.jpg",
                },
            },
        },
    ],
    nodeMap: {
        start: {
            nodeId: "start",
            content: [
                {
                    component: {
                        DialogIntrospection: {
                            children:
                                "Curious. Even though wading into the cold salty water of the see would most certainly cause you a very quick, corrosive and permanent shutdown, it feels like looking over the constantly shifting surface of the water is speeding up your de-fragmentation process.",
                        },
                    },
                },
                {
                    component: {
                        DialogIntrospection: {
                            children:
                                "You've been sitting here for so many ticks, the angle of the sun has noticeably shifted and covered everything with a pinkish film. You are almost ready to move.",
                        },
                    },
                },
                {
                    component: {
                        DialogAction: {
                            children: "Stay a while longer and enjoy the sunset",
                            action: {
                                type: GameActionTypeEnum.Common,
                                actionId: "stayLonger",
                                updateDialog: { currentNodeId: "stayLonger" },
                                setFlags: { watchedSunset: true },
                            },
                        },
                    },
                },
                {
                    component: {
                        DialogAction: {
                            children: "95% is enough. Let's move on.",
                            action: {
                                type: GameActionTypeEnum.Common,
                                actionId: "leave",
                                updateDialog: { currentNodeId: "leave" },
                            },
                        },
                    },
                },
            ],
        },
        stayLonger: {
            nodeId: "stayLonger",
            content: [
                {
                    component: {
                        DialogIntrospection: {
                            children:
                                "You are not in a rush to get up. Better finish the de-fragmentation process before moving on. You don't want to get a lag during your job interview. But more importantly, it would be a crime to miss this beautiful sunset. You don't get to see Demina, the smaller of two moons, casting a shadow over the golden disk of setting sun.",
                        },
                    },
                },
                {
                    component: {
                        DialogIntrospection: {
                            children:
                                "Aah yes, the last spark of the sun is swallowed by the see. Only Domina's blue circle will guide you through the approaching night.",
                        },
                    },
                },
                {
                    component: {
                        DialogAction: {
                            children: "It's time to move.",
                            action: {
                                type: GameActionTypeEnum.Common,
                                actionId: "leave",
                                updateDialog: { currentNodeId: "leave" },
                            },
                        },
                    },
                },
            ],
        },
        leave: {
            nodeId: "leave",
            content: [
                {
                    conditions: [
                        {
                            selector: "flagMap.watchedSunset",
                            value: true,
                        },
                    ],
                    component: {
                        DialogIntrospection: {
                            children:
                                "You stand up feeling refreshed and calm, stretch your servos and brush off sand from your legs.",
                        },
                    },
                },
                {
                    conditions: [
                        {
                            selector: "flagMap.watchedSunset",
                            not: true,
                            value: true,
                        },
                    ],
                    component: {
                        DialogIntrospection: {
                            children: "You stand up, stretch your servos and brush off sand from your legs.",
                        },
                    },
                },
                {
                    component: {
                        DialogIntrospection: {
                            children: "The archeologist will be waiting in the tavern by now.",
                        },
                    },
                },
                {
                    component: {
                        DialogAction: {
                            children: "Go to the tavern.",
                            action: {
                                type: GameActionTypeEnum.AddScheduledActions,
                                actionId: "goToTavern",
                                addScheduledActions: [
                                    {
                                        action: {
                                            type: GameActionTypeEnum.Common,
                                            actionId: "goToTavernDelayed",
                                            updateLocation: {
                                                locationId: "tavern",
                                            },
                                            showScene: SceneEnum.Location,
                                        },
                                        delayMs: 1000,
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        },
    },
};

export default newGameDialog;
