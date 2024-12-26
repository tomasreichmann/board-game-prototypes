import { getPath } from "../../services/firestoreController";
import Text, { H1, H2, H3 } from "../content/Text";
import Card from "../gameComponents/Card";
import { Navigation } from "../Navigation";
import { relicsOfValorPath } from "./routes";

const ProductCard = ({
    imageUri = "/KAC/renders/box-opened.jpg",
    title,
    description,
    href,
}: {
    imageUri?: string;
    title: string;
    description: string;
    href?: string;
}) => {
    const titleContent = <H2 className="">{title}</H2>;
    const imageContent = <img src={imageUri} alt="" className="w-full h-64 object-cover mb-2 rounded" />;
    return (
        <Card className="shadow" size="Large" backgroundImageUri="/KAC/paper.png">
            <div className="flex-1">
                {href ? <a href={href}>{imageContent}</a> : imageContent}
                {href ? <a href={href}>{titleContent}</a> : titleContent}
                <Text>{description}</Text>
            </div>
        </Card>
    );
};

export default function ProductsRoute() {
    return (
        <>
            <Navigation />
            <div className="print:m-0 w-full text-kac-iron px-2 py-5 md:px-10 bg-white">
                <H1>Products</H1>

                <div className="flex flex-row gap-4 mt-4 items-center justify-center flex-wrap">
                    <ProductCard
                        title="Mighty Decks: Base Game Box"
                        description="Everything you need to run a Mighty Decks game independent of genre and theme for up to 4 players."
                    />
                    <ProductCard
                        href={relicsOfValorPath}
                        imageUri="/KAC/medieval-example.jpg"
                        title="Mighty Decks: Relics of Valor"
                        description="A medieval expansion for the Mighty Decks base game modelled by 15th-century Bohemia. It adds medieval assets like weapons, armor, resources, and characters as well as 3 one-shot adventures and components for players to run their own medieval tavern."
                    />
                </div>
            </div>
        </>
    );
}
