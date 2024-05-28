import React, { useMemo, useState } from "react";
import Form, { getFormSchemaFromJsonSchema } from "../controls/Form";
import { JSONSchemaType } from "ajv";
import ActorCard, { ActorCardProps, actorCardSchema } from "../gameComponents/ActorCard";
import Input from "../controls/Input";
import Button from "../controls/Button";
import { useLocalSettings } from "../../../../hooks/useLocalSettings";
import ToggleData from "../../../../components/DataToggle";
import MistralService, {
    MistralChatToolType,
    MistralModelEnum,
    ToolChoice,
} from "../../../../services/Mistral/Mistral";
import { ChatCompletionResponse } from "@mistralai/mistralai";
import { useAiHorde } from "../../../../hooks/useAiHorde";
import Pending from "../../../../components/form/Pending";
import { deliberate3_sd15PresetOption } from "../../../../services/AiHorde/AiHorde";

const filteredActorPropertyNames: (keyof ActorCardProps)[] = ["name", "occupation", "reward", "threat", "notes"];
const filteredActorCardSchema = {
    type: "array",
    maxItems: 1,
    minItems: 1,
    items: {
        ...actorCardSchema,
        properties: {
            ...Object.fromEntries(
                Object.entries(actorCardSchema.properties).filter(([key]) =>
                    filteredActorPropertyNames.includes(key as any)
                )
            ),
            imageUriPrompt: { type: "string", description: "Stable diffusion image prompt" },
        },
        required: ["imageUriPrompt"],
    },
} as JSONSchemaType<any>;

export type FilteredActorProps = Pick<ActorCardProps, "name" | "occupation" | "reward" | "threat" | "notes"> & {
    imageUriPrompt: string;
};

export default function GenerateComponent() {
    const [{ mistralKey }] = useLocalSettings(["mistralKey"]);
    const formSchema = getFormSchemaFromJsonSchema(actorCardSchema as JSONSchemaType<any>);
    const [actorProps, setActorProps] = useState<ActorCardProps & { imageUriPrompt?: string }>({
        name: "Unknown",
        size: "54x86",
    });
    const [prompt, setPrompt] = useState("call generateComponent tool for a cyberpunk medic character");

    const [status, setStatus] = useState<{
        isPending: boolean;
        value: ChatCompletionResponse | null;
        error: Error | null;
    }>({
        isPending: false,
        value: null,
        error: null,
    });

    const client = useMemo(() => {
        if (!mistralKey) {
            return null;
        }
        return MistralService(mistralKey);
    }, [mistralKey]);

    const { generateImage, getPendingPropsFromCheck, isPublicApiKey } = useAiHorde();

    const onGenerate = () => {
        if (!client) {
            return;
        }
        const tools: MistralChatToolType[] = [
            {
                type: "function",
                // name: "generate component",
                function: {
                    description: "generates a component from passed props",
                    name: "generateComponent",
                    parameters: filteredActorCardSchema,
                    function: (props: FilteredActorProps) => {
                        console.log("generateComponent", { props });
                    },
                },
            },
        ];
        client
            .chat(prompt, {
                model: MistralModelEnum["open-mixtral-8x22b"],
                temperature: 0.7,
                topP: 1,
                maxTokens: 2000,
                safePrompt: false,
                toolChoice: ToolChoice.any,
                tools,
            })
            .then((chatResponse) => {
                setStatus((status) => ({
                    ...status,
                    isPending: false,
                    value: chatResponse,
                    error: null,
                }));
                console.log("useMistral success:", chatResponse);
                const toolCall = chatResponse.choices[0].message?.tool_calls?.[0]?.function.arguments;
                if (toolCall) {
                    const props = JSON.parse(toolCall) as FilteredActorProps;
                    setActorProps((currentProps) => ({
                        ...currentProps,
                        ...props,
                    }));

                    if (props.imageUriPrompt) {
                        generateImage(
                            {
                                prompt: props.imageUriPrompt,
                                models: ["Deliberate"],
                                params: {
                                    n: 1,
                                    steps: 20,
                                    cfg_scale: 7,
                                    height: 512,
                                    width: 512,
                                    sampler_name: "k_dpmpp_2m",
                                },
                            },
                            (result) => {
                                console.log(result, result.lastCheck?.generations?.[0].img);
                                const imgUri = result.lastCheck?.generations?.[0].img;
                                if (imgUri) {
                                    setActorProps((currentProps) => ({
                                        ...currentProps,
                                        imageUri: imgUri,
                                    }));
                                }
                            }
                        ).catch((error) => {
                            console.error(error);
                        });
                    }
                }
            })
            .catch((error) => {
                console.warn("useMistral error:", error);
                let errorMessage = "Request Error: ";
                if (error?.message) {
                    errorMessage += error.message;
                }
                if (error?.detail && Array.isArray(error.detail) && error.detail.length) {
                    errorMessage += "\n" + error.detail.map((error: any) => JSON.stringify(error)).join("\n");
                }
                setStatus((status) => ({
                    ...status,
                    isPending: false,
                    value: null,
                    error: new Error(errorMessage),
                }));
            });
    };

    return (
        <div>
            <Form schema={formSchema} value={actorProps} onChange={setActorProps} />
            {/* <Pending {...getPendingPropsFromCheck(status)} /> */}
            <ActorCard {...actorProps} />
            <Input type="textarea" value={prompt} onChange={(event) => setPrompt(event.target.value)} />
            <Button onClick={onGenerate} color="success">
                Generate
            </Button>
            <ToggleData
                data={{ status, getPendingPropsFromCheck, isPublicApiKey, actorProps, filteredActorCardSchema }}
            />
        </div>
    );
}
