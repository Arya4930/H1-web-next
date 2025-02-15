"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Output() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Load data on initial render
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("deforestationData");
      if (storedData) {
        try {
          setData(JSON.parse(storedData));
        } catch (error) {
          console.error("Error parsing stored data:", error);
          router.push("/");
        }
      } else {
        router.push("/");
      }
    }
  }, [router]);

  if (!isClient || !data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="bg-background min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <div className="navbar w-full bg-foreground p-4 text-textPrimary text-center text-2xl">
        🌲 Deforestify - Analysis Results
      </div>

      {/* Main Content */}
      <section className="flex-grow flex justify-center items-center max-w-6xl">
        <div className="bg-foreground p-8 rounded-xl shadow-lg shadow-black/50 text-center w-full max-w-6xl">
          <h2 className="text-black text-2xl font-bold mb-4">Deforestation Analysis</h2>

          <div className="p-4 bg-gray-100 rounded text-black text-left">
            <p><strong>Deforestation Percentage:</strong> {data.data.deforestation_percentage}%</p>
            <p><strong>Status:</strong> {data.data.status}</p>
          </div>

          {/* Show Images */}
          {data.images && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(data.images).map(([key, src], index) => (
                <div key={index} className="group relative">
                  <h3 className="text-sm font-bold text-gray-700">{key.replace("_", " ").toUpperCase()}</h3>
                  <img
                    src={src}
                    alt={`${key} Analysis`}
                    className="w-full h-40 object-cover rounded-lg shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="footer bg-gray-900 w-full text-white text-center p-4">
        <a href="#" className="mx-2">Privacy Policy</a> |
        <a href="#" className="mx-2">Terms of Service</a> |
        <a href="#" className="mx-2">Contact Us</a>
      </div>
    </main>
  );
}
