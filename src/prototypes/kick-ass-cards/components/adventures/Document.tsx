import Text, { H1 } from "../content/Text";
import { AdventureDocumentDocType, checkWriteAccess } from "../../services/firestoreController";
import { JSONSchemaType } from "ajv";
import ToggleData from "../../../../components/DataToggle";
import { twMerge } from "tailwind-merge";
import Button from "../content/Button";
import { useUser } from "@clerk/clerk-react";

export type AdventureDocumentFormType = Omit<AdventureDocumentDocType, "id" | "meta" | "contents">;

export const adventureDocumentFormJsonSchema: JSONSchemaType<AdventureDocumentFormType> = {
    type: "object",
    properties: {
        name: {
            nullable: true,
            type: "string",
        },
    },
    required: [],
    additionalProperties: false,
};

export type DocumentProps = {
    className?: string;
} & AdventureDocumentDocType;

export default function Document(props: DocumentProps) {
    const { id, className, name, meta, contents = [] } = props;

    const { user } = useUser();

    const hasWriteAccess = checkWriteAccess(meta);

    const createContent = () => {
        if (user) {
            console.log("createContent");
        }
    };

    return (
        <div className={twMerge("flex flex-col pb-8", className)}>
            <H1>{name}</H1>

            {hasWriteAccess && (
                <Button variant="solid" color="primary" className="mt-4" onClick={createContent}>
                    Add content
                </Button>
            )}

            {contents.length === 0 && (
                <Text
                    variant="body"
                    color="body"
                    className="text-lg mt-4 text-center font-bold text-kac-steel-dark py-8"
                >
                    No content yet
                </Text>
            )}

            <ToggleData data={{ contents }} />
        </div>
    );
}
