import { twMerge } from "tailwind-merge";
import { UserMetaType } from "../../services/firestoreController";
import Text from "../content/Text";

export type MetaUserProps = { className?: string } & UserMetaType;

export default function MetaUser({ className, displayName, imageUrl }: MetaUserProps) {
    return (
        <div className={twMerge("flex flex-row gap-2 items-center", className)}>
            <Text>{displayName}</Text>
            {imageUrl && <img className="w-8 h-8 rounded-full object-cover" src={imageUrl} alt="" />}
        </div>
    );
}
