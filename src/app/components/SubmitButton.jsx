import { Button } from "@material-tailwind/react";
import { useState } from "react";


function SubmitButton() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [fullscreenImage, setFullscreenImage] = useState(null);

    const handleClick = async () => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const res = await fetch("http://127.0.0.1:5000/run-analysis");
            if (!res.ok) throw new Error(`Error: ${res.status}`);

            const jsonData = await res.json();
            setData(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center">
            <Button

                className="text-lg px-8 py-3 bg-blue-500 text-white border-none rounded-lg hover:bg-blue-600"
                onClick={handleClick}
                disabled={loading}
            >
                {loading ? "Loading..." : "Fetch Data"}
            </Button>

            {/* ✅ Show API Response JSON */}
            {data && (
                <pre className="mt-4 p-4 bg-gray-100 text-black rounded text-sm">
                    {JSON.stringify(data.data, null, 2)}
                </pre>
            )}

            {/* ✅ Display Images if Available */}
            {data?.images && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                    {[
                        { label: "NDVI New", src: data.images.nadvi_new },
                        { label: "NDVI Old", src: data.images.nadvi_old },
                        { label: "SAVI New", src: data.images.savi_new },
                        { label: "SAVI Old", src: data.images.savi_old }
                    ].map((image, index) => (
                        <div key={index} className="group relative">
                            <h3 className="font-bold text-sm">{image.label}</h3>
                            <img
                                src={image.src}
                                alt={image.label}
                                className="w-64 h-64 shadow cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105"
                                onClick={() => setFullscreenImage(image.src)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* ✅ Fullscreen Image View */}
            {fullscreenImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-lg transition-opacity duration-500 ease-in-out"
                    onClick={() => setFullscreenImage(null)}
                >
                    <img
                        src={fullscreenImage}
                        alt="Fullscreen"
                        className="max-w-[90vw] max-h-[90vh] rounded-lg transition-transform duration-500 ease-in-out scale-100 hover:scale-105 shadow-2xl"
                    />
                    <button
                        className="absolute top-5 right-5 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1"
                        onClick={() => setFullscreenImage(null)}
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* ✅ Show Errors */}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
}

export default SubmitButton;