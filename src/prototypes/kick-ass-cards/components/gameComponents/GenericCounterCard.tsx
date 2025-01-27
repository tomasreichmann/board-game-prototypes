import { CounterType } from "../../data/counters-deck";
import Icon from "../Icon";
import Card, { CardHeader, CardBody, CardProps } from "./Card";

export type GenericCounterCardProps = React.PropsWithChildren<
    Partial<CardProps> & Omit<CounterType, "count"> & { className?: string }
>;

export default function GenericCounterCard({ icon, deck, size = "Bridge", ...restProps }: GenericCounterCardProps) {
    return (
        <Card size={size} {...restProps}>
            <CardHeader icon={icon} className="z-10" cornerIcon="/KAC/counter.png" deck={deck}></CardHeader>
            <CardBody icon={icon}>
                <div className="self-center flex flex-row flex-wrap max-w-32 gap-2 justify-center items-center mx-auto opacity-50">
                    <Icon icon="d4" className={"w-8 h-8"} />
                    <Icon icon="d6" className={"w-8 h-8"} />
                    <Icon icon="d8" className={"w-8 h-8"} />
                    <Icon icon="d10" className={"w-8 h-8"} />
                    <Icon icon="d12" className={"w-8 h-8"} />
                </div>
            </CardBody>
        </Card>
    );
}
