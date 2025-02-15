"use client";

import { Button } from '@material-tailwind/react';
import { useState } from 'react';

function SubmitButton({ file }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        setLoading(true);
        setError(null);

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
                onClick={handleClick} // ✅ Added onClick
                disabled={loading} // ✅ Disables button when loading
            >
                {loading ? "Loading..." : "Fetch Data"}
            </Button>

            {/* ✅ Show API Response */}
            {data && <div>{JSON.stringify(data, null, 2)}</div>}

            {/* ✅ Show Errors */}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
}

export default SubmitButton;
