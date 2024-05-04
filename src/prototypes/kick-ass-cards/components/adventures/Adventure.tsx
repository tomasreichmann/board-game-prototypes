import Text from "../content/Text";
import { AdventureDocType, checkWriteAccess, createAdventureDocument } from "../../services/firestoreController";
import { JSONSchemaType } from "ajv";
import ToggleData from "../../../../components/DataToggle";
import Heading from "../Heading";
import { twMerge } from "tailwind-merge";
import Button from "../content/Button";
import { useUser } from "@clerk/clerk-react";
import { adventuresPath } from "../routes/routes";

export type AdventureFormType = Omit<AdventureDocType, "id" | "meta" | "contents">;

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
            maxLength: 1000,
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
    const { id, className, name, description, meta, contents = [], imageUri } = props;

    const { user } = useUser();

    const hasWriteAccess = checkWriteAccess(meta);

    const createContent = () => {
        if (user) {
            createAdventureDocument(id, user).then((docRef) => {
                window.location.assign([adventuresPath, id, "docs", docRef.id].join("/"));
            });
        }
    };

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

            {hasWriteAccess && (
                <Button variant="solid" color="primary" className="mt-4" onClick={createContent}>
                    Create new document
                </Button>
            )}

            {contents.length === 0 && (
                <Text
                    variant="body"
                    color="body"
                    className="text-lg mt-4 text-center font-bold text-kac-steel-dark py-8"
                >
                    No documents yet
                </Text>
            )}

            {contents.length > 0 && <ToggleData data={{ contents }} />}
            <ToggleData data={{ contents }} />
        </div>
    );
}
