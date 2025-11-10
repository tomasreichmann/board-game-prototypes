import { SmartDocContentItemType } from "./smartDocs";
import smartDocElementMap, { ElementControlTypeEnum, SmartDocElementType } from "./smartDocElementMap";
import SmartDocContentDrop from "./SmartDocContentDrop";
import DataPreview from "../../../../components/DataPreview";

export type SmartDocContentProps = {
    isEditing?: boolean;
    content: SmartDocContentItemType[];
    path: string;
};

const getPropsWithDrop = <P extends Record<string, unknown>>(
    props: P,
    controls: SmartDocElementType<P>["controls"],
    path: string
) => {
    return Object.fromEntries(
        (Object.entries(props) as [keyof P, any][]).map(([key, value]) => {
            const controlItem = controls[key];
            if (controlItem.type === ElementControlTypeEnum.Nodes) {
                const isValueArray = Array.isArray(value);
                const hasValue = value !== undefined && value !== null;
                const arrayValue = isValueArray ? [...value] : hasValue ? [value] : [];
                arrayValue.push(
                    <SmartDocContentDrop
                        key="drop-last"
                        path={`${path}.${String(key)}`}
                        mode={arrayValue.length === 0 ? undefined : "append"}
                    />
                );
                if (arrayValue.length > 1) {
                    arrayValue.unshift(
                        <SmartDocContentDrop key="drop-first" path={`${path}.${String(key)}`} mode="prepend" />
                    );
                }
                return [key, arrayValue];
            }
            return [key, value];
        })
    );
};

export default function SmartDocContent({ content, path, isEditing }: SmartDocContentProps) {
    return (
        <>
            <SmartDocContentDrop path={path} mode="prepend" />
            {content.map((contentItem, contentItemIndex) => {
                const { componentName, id, props } = contentItem;
                if (!(componentName in smartDocElementMap)) {
                    console.warn("component name not found", componentName);
                    return null;
                }
                const { Component, controls } = smartDocElementMap[componentName as keyof typeof smartDocElementMap];
                const propsWithDrop = isEditing
                    ? getPropsWithDrop(props, controls as any, path + "." + contentItemIndex)
                    : props;

                return (
                    <div key={id} className="border-2 border-kac-steel-dark p-2 rounded-md">
                        <Component {...(propsWithDrop as any)} />
                        <DataPreview data={contentItem} />
                    </div>
                );
            })}
            {content.length > 0 && <SmartDocContentDrop path={path} mode="append" />}
        </>
    );
}
