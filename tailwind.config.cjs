/** @type {import('tailwindcss').Config} */
const lightTheme = require("daisyui/src/colors/themes")["[data-theme=light]"];
console.log(lightTheme);
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/daisyui/dist/**/*.js",
        "node_modules/react-daisyui/dist/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                "fire-1": "#f63c01",
                "fire-2": "#f97d02",
                "fire-3": "#f8a700",
                "fire-4": "#fdda00",
                "fire-5": "#fef24f",
                "blood-1": "#870108",
                "blood-2": "#a80000",
                "blood-3": "#bd3535",
                "blood-4": "#d96161",
                "blood-5": "#feb2b2",
                "lightning-1": "#01365c",
                "lightning-2": "#08537d",
                "lightning-3": "#1378c4",
                "lightning-4": "#71d3d0",
                "lightning-5": "#b4fcd5",
                "acid-1": "#83c30a",
                "acid-2": "#cfe10c",
                "acid-3": "#ecea00",
                "acid-4": "#fefb98",
                "acid-5": "#fffeeb",
                "curse-1": "#e6158e",
                "curse-2": "#f962a9",
                "curse-3": "#faa3cd",
                "curse-4": "#fed4ed",
                "curse-5": "#fff2ff",
            },
            fontFamily: {
                dtHeading: ["Germania One", "sans-serif"],
            },
        },
    },
    daisyui: {
        themes: [
            "light",
            "dark",
            {
                DungeonTimePrototype: {
                    ...lightTheme,
                    primary: "#f63c01",
                    fontFamily: "Alegreya, serif",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
