import { SignedOut } from "@clerk/clerk-react";
import Text, { TextProps } from "../content/Text";
import { twMerge } from "tailwind-merge";

export type SignedOutWarningProps = {
    className?: string;
    text?: string;
    textProps?: TextProps;
};

export default function SignedOutWarning({
    className,
    text = "⚠ Some features might not be available while not signed in",
    textProps: { className: textClassName, ...textProps } = {},
}: SignedOutWarningProps) {
    return (
        <SignedOut>
            <Text
                color="warning"
                variant="body"
                {...textProps}
                className={twMerge(className, textClassName, "self-center font-bold")}
            >
                {text}
            </Text>
        </SignedOut>
    );
}
