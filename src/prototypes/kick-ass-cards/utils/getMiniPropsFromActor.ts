import { ActorCardProps } from "../components/gameComponents/ActorCard";

const getMiniProps = ({name = "", imageUri}: Pick<ActorCardProps, "name" | "imageUri">) => ({ baseContent: name ? name.split(" ")[0] : undefined, imageUri })

export default getMiniProps;