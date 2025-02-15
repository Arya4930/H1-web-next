"use client"

import { useState, useEffect } from "react";
import SubmitButton from "./components/SubmitButton";

export default function Home() {
    const [folders, setFolders] = useState([]);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const res = await fetch("http://127.0.0.1:5000/get-folders");
                if (!res.ok) throw new Error(`Error: ${res.status}`);

                const data = await res.json();
                setFolders(data.folders);  
                setStartDate(data.folders[0] || "");  
                setEndDate(data.folders[0] || "");  
            } catch (err) {
                console.error(err);
                setError("Failed to fetch folder names");
            }
        };

        fetchFolders();
    }, []);

    return (
        <main className='bg-background min-h-screen flex flex-col items-center'>
            {/* Navbar */}
            <div className='navbar w-full bg-foreground p-4 text-textPrimary text-center text-2xl'>
                <i className='fa fa-space-shuttle'></i> Deforestify
            </div>

            {/* Main Section */}
            <section className='flex-grow flex justify-center items-center'>
                <div className='card bg-foreground p-8 rounded-xl shadow-lg shadow-black/50 text-center w-96'>
                    <h2 className='text-textPrimary text-2xl mb-4'>Select Date Range</h2>

                    {/* Start Date Dropdown */}
                    <label htmlFor='start-date' className='text-textSecondary block text-left'>Start Date</label>
                    <select 
                        className='dropdown w-full p-2 mt-1 mb-4 rounded bg-background text-textPrimary' 
                        id='start-date'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    >
                        {folders.length > 0 ? (
                            folders.map((folder, index) => (
                                <option key={index} value={folder}>{folder}</option>
                            ))
                        ) : (
                            <option disabled>Loading...</option>
                        )}
                    </select>

                    {/* End Date Dropdown */}
                    <label htmlFor='end-date' className='text-textSecondary block text-left'>End Date</label>
                    <select 
                        className='dropdown w-full p-2 mt-1 mb-4 rounded bg-background text-textPrimary' 
                        id='end-date'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    >
                        {folders.length > 0 ? (
                            folders.map((folder, index) => (
                                <option key={index} value={folder}>{folder}</option>
                            ))
                        ) : (
                            <option disabled>Loading...</option>
                        )}
                    </select>

                    {/* Submit Button with Props */}
                    <SubmitButton startDate={startDate} endDate={endDate} />
                </div>
            </section>

            {/* Footer */}
            <div className='footer bg-foreground w-full text-textPrimary text-center p-4'>
                <a href='#' className='mx-2'>Privacy Policy</a> | 
                <a href='#' className='mx-2'>Terms of Service</a> | 
                <a href='#' className='mx-2'>Contact Us</a>
            </div>

            {/* Show Error if Any */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </main>
    );
}
