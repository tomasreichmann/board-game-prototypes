import { twMerge } from "tailwind-merge";
import { smartDocsPath } from "../routes/routes";
import { SmartDocFileType } from "./smartDocs";
import Button from "../content/Button";

export type SmartDocListProps = React.PropsWithChildren<{
    className?: string;
    smartDocs: SmartDocFileType[];
}>;

export default function SmartDocList({ className, smartDocs, children }: SmartDocListProps) {
    return (
        <div className={twMerge("SmartDocList flex flex-col gap-2", className)}>
            {smartDocs.map(({ title, path }) => (
                <li key={path} className="flex flex-row">
                    <Button href={smartDocsPath + "/" + path} variant="text" color="info">
                        {title}
                    </Button>
                </li>
            ))}
            {children}
        </div>
    );
}
