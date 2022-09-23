import useGoogleSheets from "use-google-sheets";

const Sheet = () => {
    const { data, loading, error } = useGoogleSheets({
        apiKey: "AIzaSyAm5yIsB152NAh1EWBc0dQwRAoy5ajpbE4",
        sheetId: "1A9ibKGg4ASiIl3PiDix6ASe9Tj55oKAiPuBPJcw7pLg",
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error!</div>;
    }

    return (
        <pre style={{ overflow: "auto", maxWidth: "100%" }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    );
};
export default Sheet;
