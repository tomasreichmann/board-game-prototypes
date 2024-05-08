import safeStringify from "../../../../utils/safeStringify";
import Text, { TextProps } from "./Text";
import { useEffect, useState } from "react";

export type JsonInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    textareaRef?: React.RefObject<HTMLTextAreaElement>;
    errorProps?: TextProps;
};

export default function JsonInput({ value, onChange, textareaRef, errorProps, ...restProps }: JsonInputProps) {
    const [tempValue, setTempValue] = useState(value);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
        setError(undefined);
        setTempValue(safeStringify(value, null, 2));
    }, [value]);

    const onTempChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTempValue(event.target.value);

        try {
            const parsedValue = JSON.parse(event.target.value);
            onChange?.({ ...event, target: { ...event.target, value: parsedValue } });
            setError(undefined);
        } catch (error) {
            setError(error as Error);
        }
    };

    return (
        <>
            <textarea value={tempValue} ref={textareaRef} onChange={onTempChange} {...restProps} />
            {error && (
                <Text variant="body" className="text-kac-blood" {...errorProps}>
                    {error.message}
                </Text>
            )}
        </>
    );
}
