module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    /* Use the default parser for plain JS files; apply the TypeScript parser
       only to TS/TSX files via overrides so we don't confuse parsing for other
       file types. */
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "mdx"],
    rules: {
        // project sensible defaults; tweak as you like
        "react/react-in-jsx-scope": "off", // Vite + React 17+ doesn't need import React
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/prop-types": "off", // we use TypeScript for prop typing
        "jsx-a11y/anchor-is-valid": "off", // optional: adjust to your needs
    },
    ignorePatterns: ["node_modules/", "dist/", "public/", "build/", "vite.config.ts"],
    overrides: [
        {
            files: ["**/*.{ts,tsx}"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: "./tsconfig.json",
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
            extends: ["plugin:@typescript-eslint/recommended"],
            rules: {
                // allow explicit `any` in this project where necessary
                "@typescript-eslint/no-explicit-any": "off",
            },
        },
        {
            files: ["**/*.mdx"],
            parser: "eslint-mdx",
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true },
                // Support YAML frontmatter (---...---)
                markdownFeatures: {
                    frontmatter: true,
                },
            },
            extends: ["plugin:mdx/recommended"],
            rules: {
                // optional: relax or configure MDX-specific rules here
            },
            globals: {
                // components provided via the MDX provider (defaultMdxComponentMap)
                a: "readonly",
                Alert: "readonly",
                Aside: "readonly",
                List: "readonly",
                p: "readonly",
                Button: "readonly",
                li: "readonly",
                LinkList: "readonly",
                Columns: "readonly",
                Hand: "readonly",
                Outcome: "readonly",
                img: "readonly",
                Image: "readonly",
                Heading: "readonly",
                Player: "readonly",
                Spread: "readonly",
                Actor: "readonly",
                ActorCardWithTacticalOverlay: "readonly",
                Asset: "readonly",
                Effect: "readonly",
                Clock: "readonly",
                CounterCard: "readonly",
                StuntCard: "readonly",
                GenericCounterCard: "readonly",
                Paper: "readonly",
                PaperMini: "readonly",
                LayeredCard: "readonly",
                LayeredActorCard: "readonly",
                LayeredAssetCard: "readonly",
                ComponentHelper: "readonly",
                Mdx: "readonly",
                Text: "readonly",
                Toggle: "readonly",
            },
        },
    ],
};
