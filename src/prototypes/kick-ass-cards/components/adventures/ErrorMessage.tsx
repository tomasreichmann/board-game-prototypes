import { twMerge } from "tailwind-merge";
import { UserMetaType } from "../../services/firestoreController";
import Text, { H5 } from "../content/Text";
import { ErrorComponentProps } from "../../../../components/ErrorBoundary";
import ToggleData from "../../../../components/DataToggle";
import Button from "../content/Button";

export type ErrorMessageProps = React.PropsWithChildren<{
    className?: string;
    heading?: React.ReactNode;
    body?: React.ReactNode;
}>;

export const ErrorBoundaryErrorMessage = ({
    error,
    errorInfo,
    retry,
    children,
}: ErrorComponentProps & { children?: React.ReactNode }) => {
    const heading = "⚠ " + (error?.name ? error?.name : "Unknown Error");
    return (
        <ErrorMessage
            heading={heading}
            body={
                <>
                    {error?.message}
                    {errorInfo && <ToggleData data={errorInfo} />}
                    <Button onClick={retry} variant="solid" color="primary" size="sm" className="ml-4">
                        Retry
                    </Button>
                    {children}
                </>
            }
        />
    );
};

export default function ErrorMessage({ className, heading = "⚠ Error", body, children }: ErrorMessageProps) {
    return (
        <div className={twMerge("flex-1 flex flex-col gap-2 justify-center items-center p-8 bg-white", className)}>
            <H5 color="danger" className="text-center">
                {heading}
            </H5>
            {body && (
                <Text color="danger" variant="body" className="text-center">
                    {body}
                </Text>
            )}
            {children}
        </div>
    );
}
