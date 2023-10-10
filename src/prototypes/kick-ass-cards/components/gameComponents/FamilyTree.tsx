import { Person } from "../../generators/generatePerson";
import PersonCard from "./PersonCard";

export type FamilyTreeProps = {
    familyName: string;
    mother: Partial<Person>;
    father: Partial<Person>;
    children: Partial<Person>[];
};

const sortByAgeDescending = (a: Partial<Person>, b: Partial<Person>) => {
    if (a.age === undefined && b.age === undefined) return 0;
    if (a.age === undefined) return -1;
    if (b.age === undefined) return 1;
    return b.age - a.age;
};

const FamilyTree = ({ familyName, mother, father, children }: FamilyTreeProps) => {
    const haveChildren = children.length > 0;
    return (
        <div className="flex flex-col items-center">
            <h5 className="center font-bold text-kac-steel-dark text-lg">{familyName}</h5>
            <div className="flex flex-row">
                <div>
                    <PersonCard {...mother} />
                </div>
                <div className="w-5 self-stretch relative">
                    <div className="absolute top-1/2 left-0 right-0 border-t-2 border-slate-500" />
                    {haveChildren && (
                        <div className="absolute top-1/2 left-1/2 h-1/2 border-l-2 -ml-[1px] border-slate-500" />
                    )}
                </div>
                <div>
                    <PersonCard {...father} />
                </div>
            </div>
            {haveChildren && (
                <>
                    <div className="w-full h-5 relative">
                        <div className="absolute top-0 left-1/2 h-full border-l-2 -ml-[1px] border-slate-500" />
                    </div>
                    <div className="flex flex-row">
                        {[...children].sort(sortByAgeDescending).map((child, childIndex) => {
                            const isOnlyChild = children.length === 1;
                            const isFirstChild = childIndex === 0;
                            const isLastChild = childIndex === children.length - 1;
                            const isMiddleChild = !isFirstChild && !isLastChild;
                            return (
                                <div key={childIndex} className="relative pt-5">
                                    {!isOnlyChild && isFirstChild && (
                                        <div className="absolute top-0 left-1/2 w-1/2 border-t-2 border-slate-500" />
                                    )}
                                    {!isOnlyChild && isMiddleChild && (
                                        <div className="absolute top-0 left-0 w-full border-t-2 border-slate-500" />
                                    )}
                                    {!isOnlyChild && isLastChild && (
                                        <div className="absolute top-0 left-0 w-1/2 border-t-2 border-slate-500" />
                                    )}
                                    <div className="absolute top-0 left-1/2 h-5 border-l-2 -ml-[1px] border-slate-500" />
                                    <PersonCard {...child} />
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default FamilyTree;
