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

  // Listen for changes in localStorage data
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "deforestationData") {
        const updatedData = localStorage.getItem("deforestationData");
        try {
          setData(updatedData ? JSON.parse(updatedData) : null);
        } catch (error) {
          console.error("Error parsing updated data:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!isClient) return null;

  return (
    <main className="bg-background min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <div className="navbar w-full bg-foreground p-4 text-textPrimary text-center text-2xl">
        <i className="fa fa-tree"></i> Deforestify
      </div>

      {/* Main Content */}
      <section className="flex-grow flex justify-center items-center max-w-6xl">
        <div className="bg-foreground p-8 rounded-xl shadow-lg shadow-black/50 text-center w-full max-w-6xl">
          <h2 className="text-textPrimary text-2xl mb-4">Analysis Results</h2>

          {data ? (
            <>
              <div className="mt-4 p-4 bg-gray-100 text-black rounded text-sm text-center text-left">
                <p>
                  <strong>Deforestation Percentage:</strong>{" "}
                  {data.data.deforestation_percentage}%
                </p>
                <p>
                  <strong>Status:</strong> {data.data.status}
                </p>
              </div>
              {data.images && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {Object.entries(data.images).map(([key, src], index) => (
                    <div key={index} className="group relative">
                      <h3 className="font-bold text-sm">
                        {key.replace("_", " ").toUpperCase()}
                      </h3>
                      <img
                        src={src}
                        alt={`${key} Analysis`}
                        className="w-64 h-64 shadow rounded-lg object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="footer bg-foreground w-full text-textPrimary text-center p-4">
        <a href="#" className="mx-2">
          Privacy Policy
        </a>{" "}
        |
        <a href="#" className="mx-2">
          Terms of Service
        </a>{" "}
        |
        <a href="#" className="mx-2">
          Contact Us
        </a>
      </div>
    </main>
  );
}
