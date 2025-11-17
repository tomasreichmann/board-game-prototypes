import Button, { ButtonLinkType } from "../controls/Button";
import twm from "@/utils/twm";

export type LinkListProps = React.PropsWithChildren<{
    className?: string;
    links: ButtonLinkType[];
}>;

export default function LinkList({ links, className }: LinkListProps) {
    return (
        <div className={twm("flex flex-row flex-wrap items-baseline gap-2 not-prose", className)}>
            {links.map(({ children, href }) => (
                <Button key={href} href={href} variant="text" color="info">
                    {children}
                </Button>
            ))}
        </div>
    );
}
