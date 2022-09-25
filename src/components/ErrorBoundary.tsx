import React, { ErrorInfo, ReactNode } from "react";
import { Alert, Button } from "react-daisyui";

export type ErrorComponentProps = {
    className?: string;
    error?: Error;
    errorInfo?: ErrorInfo;
    retry: () => void;
};

export const DefaultErrorComponent = ({
    className,
    error = new Error("Unknown error!"),
    errorInfo,
    retry,
}: ErrorComponentProps) => {
    return (
        <Alert
            className={className}
            icon={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                </svg>
            }
        >
            <div className="text-bold text-xl">{error.name}</div>
            <div>{error.message}</div>
            {errorInfo && <div>{errorInfo.componentStack}</div>}
            <Button onClick={retry}>Retry</Button>
        </Alert>
    );
};

export type ErrorBoundaryProps = {
    className?: string;
    ErrorComponent?: React.ComponentType<ErrorComponentProps>;
    children: ReactNode;
};

interface State {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    State
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error, errorInfo: ErrorInfo) {
        // Update state so the next render will show the fallback UI.
        return { error, errorInfo };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.error("ErrorBoundary caught: ", error, errorInfo);
    }

    retry = () => {
        this.setState({ error: null, errorInfo: null });
    };

    render() {
        if (this.state.error) {
            const { className, ErrorComponent = DefaultErrorComponent } =
                this.props;
            const error = this.state.error as ErrorComponentProps["error"];
            const errorInfo = this.state
                .errorInfo as ErrorComponentProps["errorInfo"];
            // You can render any custom fallback UI
            return (
                <ErrorComponent
                    {...{ className, error, errorInfo, retry: this.retry }}
                />
            );
        }

        return this.props.children;
    }
}
