import { Navigation } from "../Navigation";
import GenerateComponent from "../generateComponent/GenerateComponent";

export default function GenerateComponentRoute() {
    return (
        <>
            <Navigation />
            <div className="flex-1 mt-4 print:m-0 w-full text-kac-iron p-2 md:px-10 bg-white">
                <GenerateComponent />
            </div>
        </>
    );
}
