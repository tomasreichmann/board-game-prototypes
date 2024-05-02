import Text from "../content/Text";
import { AdventureDocType } from "../../services/firestoreController";
import { JSONSchemaType } from "ajv";
import ToggleData from "../../../../components/DataToggle";
import Heading from "../Heading";
import { twMerge } from "tailwind-merge";

export type AdventureFormType = Omit<AdventureDocType, "id" | "meta" | "content">;

export const adventureFormJsonSchema: JSONSchemaType<AdventureFormType> = {
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
} & AdventureDocType;

export default function Adventure(props: AdventureProps) {
    const { className, name, description, content = [], imageUri } = props;
    return (
        <div className={twMerge("flex flex-col pb-8", className)}>
            <Heading
                heading={name}
                imageUri={imageUri}
                headingClassName="absolute left-0 bottom-0 right-0 px-8 pb-4 pt-8 text-left bg-gradient-to-b from-black/0 via-20% via-black/30 to-35% to-black/40 "
            />

            {description && (
                <Text variant="body" color="body" className="text-lg mt-4 lg:columns-2 xl:columns-3">
                    {description}
                </Text>
            )}

            {content.length === 0 && (
                <Text
                    variant="body"
                    color="body"
                    className="text-lg mt-4 text-center font-bold text-kac-steel-dark py-8"
                >
                    No content yet
                </Text>
            )}

            {content.length > 0 && <ToggleData data={{ content }} />}
            <ToggleData data={{ content }} />
        </div>
    );
}
