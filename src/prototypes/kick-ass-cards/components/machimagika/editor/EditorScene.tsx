import React from "react";
import { twMerge } from "tailwind-merge";
import useGameContext from "../model/GameContext";

export type EditorSceneProps = React.PropsWithChildren<{
    className?: string;
}>;

const data = {
    currentNode: "wakeUpOnBeech",
    nodeMap: {
        root: {
            nodeId: "wakeUpOnBeech",
            content: [
                {
                    component: {
                        Dialog: {
                            content: [
                                {
                                    component: {
                                        Text: {
                                            className: "text-lg font-bold",
                                            children: "Waking up",
                                        },
                                    },
                                },
                                {
                                    component: {
                                        Text: {
                                            children: "You get online lying face down in cold sand.",
                                        },
                                    },
                                },
                                {
                                    component: {
                                        Text: {
                                            className: "text-md",
                                            children:
                                                "You asses yourself and discover several problems. Your sensors are covered in sand, your memory is corrupted and you are missing a leg.",
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    component: {
                        Task: {
                            title: "Wipe of the sand from your sensors",
                            effort: 2,
                            outcome: {
                                fumble: {
                                    content: [
                                        {
                                            Text: {
                                                children:
                                                    "Your servos are full of sand and moving so erratically you spend a few minutes just throwing sand around before you still yourself to try again.",
                                            },
                                        },
                                    ],
                                },
                                partialSuccess: {
                                    content: [
                                        {
                                            condition: {
                                                effort: {
                                                    value: 0,
                                                },
                                            },
                                            Text: {
                                                children:
                                                    "You slowly move your arms across your face pushing a bit of sand off.",
                                            },
                                        },
                                        {
                                            condition: {
                                                effort: {
                                                    value: 1,
                                                },
                                            },
                                            Text: {
                                                children: "You slowly remove the rest of the sand off.",
                                            },
                                        },
                                    ],
                                },
                                success: {
                                    content: [
                                        {
                                            Text: {
                                                children: "You carefully scoop all the sand from your eyes.",
                                            },
                                        },
                                    ],
                                },
                            },
                            onComplete: {
                                content: [
                                    {
                                        Text: {
                                            children: "You successfully wipe most of the sand from your sensors.",
                                        },
                                    },
                                    {
                                        Text: {
                                            children: "You look around to get your bearings.",
                                        },
                                    },
                                    {
                                        Text: {
                                            children:
                                                "You seem to be on a beech at night. Your torn leg lying close by.",
                                        },
                                    },
                                ],
                                setFlag: {
                                    name: "wakeUpOnBeech.wipedSensors",
                                    value: true,
                                },
                            },
                        },
                    },
                },
                {
                    component: {
                        Task: {
                            title: "Re-attach your leg",
                            effort: 3,
                            outcome: {
                                fumble: {
                                    content: [
                                        {
                                            Text: {
                                                children: "ZAP! You short-circuited!",
                                            },
                                        },
                                        {
                                            Text: {
                                                children: "+1 GLITCH",
                                            },
                                        },
                                    ],
                                },
                                partialSuccess: {
                                    content: [
                                        {
                                            Text: {
                                                children:
                                                    "On a second try, you managed to attach a torn wire to your leg.",
                                            },
                                        },
                                    ],
                                },
                                success: {
                                    content: [
                                        {
                                            Text: {
                                                children: "You managed to connect more wires without shorting them.",
                                            },
                                        },
                                    ],
                                },
                            },
                            onComplete: {
                                content: [
                                    {
                                        Text: {
                                            children: "Your leg is fully connected. Good as new...",
                                        },
                                    },
                                    {
                                        Text: {
                                            children: "Not really. But it can take you away from this oily beech.",
                                        },
                                    },
                                ],
                                setFlag: {
                                    name: "wakeUpOnBeech.wipedSensors",
                                    value: true,
                                },
                            },
                        },
                    },
                },
                {
                    component: {
                        Task: {
                            title: "Recover memory",
                            effort: 2,
                            content: [
                                {
                                    Text: {
                                        children:
                                            "You can stay and try to recover your corrupted memory. But staying here might be a bad idea. Whatever messed you up might still be nearby.",
                                    },
                                },
                            ],
                            outcome: {
                                fumble: {
                                    content: [
                                        {
                                            Text: {
                                                children: "TSSS! You overheated!",
                                            },
                                        },
                                        {
                                            Text: {
                                                children: "+1 DAMAGE",
                                            },
                                        },
                                    ],
                                },
                                partialSuccess: {
                                    effort: 0,
                                    content: [
                                        {
                                            Text: {
                                                children:
                                                    "You tried to recover a badly damaged segment. But it didn't work at all. At least you didn't break anything",
                                            },
                                        },
                                    ],
                                },
                                success: {
                                    content: [
                                        {
                                            Text: {
                                                children: "You managed to recover all the data you could.",
                                            },
                                        },
                                    ],
                                },
                            },
                            onComplete: {
                                content: [
                                    {
                                        Text: {
                                            children: "TODO: memory of what happened",
                                        },
                                    },
                                ],
                                setFlag: {
                                    name: "wakeUpOnBeech.recoveredMemory",
                                    value: true,
                                },
                            },
                        },
                    },
                },
            ],
        },
    },
};

export default function EditorScene({ className, children }: EditorSceneProps) {
    const [[cursorX, cursorY], setCursorPosition] = React.useState([0, 0]);
    const { dispatch, state } = useGameContext();
    return (
        <div className={twMerge("EditorScene relative w-full h-full flex flex-col", className)}>
            <h1
                className="relative text-mm-steel text-5xl font-mmHeading uppercase z-[2] p-10"
                style={{ textShadow: "0 0 10px #528FC7" }}
            >
                EDITOR
            </h1>

            <div className="flex-1 relative"></div>

            {children}
        </div>
    );
}
