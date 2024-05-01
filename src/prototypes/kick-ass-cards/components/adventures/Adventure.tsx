import Text from "../content/Text";
import { AdventureDocType } from "../../services/firestoreController";
import { JSONSchemaType } from "ajv";
import ToggleData from "../../../../components/DataToggle";
import Heading from "../Heading";
import { twMerge } from "tailwind-merge";

export type AdventureFormType = Omit<AdventureDocType, "id" | "meta" | "content">;

export const adventureFormSchema: JSONSchemaType<AdventureFormType> = {
    type: "object",
    properties: {
        name: {
            nullable: true,
            type: "string",
        },
        description: {
            nullable: true,
            type: "string",
        },
        imageUri: {
            nullable: true,
            type: "string",
        },
    },
    required: [],
    additionalProperties: false,
};

export type AdventureProps = {
    className?: string;
    warnings?: React.ReactNode;
} & AdventureDocType;

export default function Adventure(props: AdventureProps) {
    const { className, name, description, imageUri, warnings } = props;
    return (
        <div className={twMerge("flex flex-col", className)}>
            <Heading heading={name} imageUri={imageUri} />

            {description && (
                <Text variant="body" color="body" className="text-lg mt-4">
                    {description}
                </Text>
            )}

            {warnings}

            <ToggleData data={{ name, description, imageUri }} />
        </div>
    );
}
