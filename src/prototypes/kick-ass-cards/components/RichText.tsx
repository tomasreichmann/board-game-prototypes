import React from "react";
import GenericRichText, { RichTextProps as GenericRichTextProps } from "../../../components/RichText";
// import "./RichText.css";

export const defaultAliasComponentMap: { [key: string]: React.ComponentType<{ match: string }> } = {
    "<BR>": () => <br />,
};

type Alias = Exclude<keyof typeof defaultAliasComponentMap, number>;

export type RichTextProps = {
    children: string;
} & Omit<Partial<GenericRichTextProps<Alias, {}>>, "aliasComponentMap">;

export default function RichText({ ...innerProps }: RichTextProps) {
    return <GenericRichText aliasComponentMap={defaultAliasComponentMap} {...innerProps} />;
}
