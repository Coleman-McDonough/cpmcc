// src/app/materials/page.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../lib/fetchData";
import { MaterialsEntry } from "../models/EntrySchemas";
import { formatStringAsNumber, isNumeric } from "../lib/helpers";
import Contact from "@/components/Contact";

function MaterialsPage() {
  const [materials, setMaterials] = useState<MaterialsEntry[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    fetchData("/api/materials")
      .then((data) => setMaterials(data))
      .finally(() => setLoading(false)); // Set loading to false when data is fetched
  }, []);

  return (
    <>
      <div className="mt-20 sm:mt-16">
        <div className=" flex min-h-screen flex-col  text-gray-900">
          {/* Header Section */}
          <header className="container mx-auto p-4 ">
            <div className=" flex flex-col items-center gap-2 ">
              <h1 className="my-4 text-center text-2xl font-bold md:text-4xl">
                Materials For Sale
              </h1>
              <a
                href={`tel:978-375-7001`}
                className="rounded bg-green-800 p-4 text-white hover:bg-green-600"
              >
                Call 978-375-7001
              </a>
            </div>
          </header>

          {/* Main Content Section */}
          <main className="container mx-auto mb-8 flex-1 px-6">
            {loading ? (
              // Render spinner while loading
              <div className="flex h-48 items-center justify-center">
                <svg
                  className="h-12 w-12 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <p className="ml-4 text-xl">Loading Materials...</p>
              </div>
            ) : (
              // Render materials grid once data is loaded
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {materials.map((item) => (
                  <div
                    key={item.urlEnd}
                    className={`flex transform cursor-pointer flex-col items-center rounded-lg p-5 shadow-lg transition hover:-translate-y-2 hover:bg-gray-200`}
                    onClick={() =>
                      window.location.assign(`/materials/${item.urlEnd}`)
                    }
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-48 w-full rounded-t-lg object-cover"
                    />
                    <div className="mt-4 text-center">
                      <h2 className="text-gradient mb-2 text-xl font-semibold">
                        {item.name}
                      </h2>
                      {item.typesAndPrices.map((typePrice, index) => (
                        <div key={index} className=" text-gray-400">
                          <p className="text-lg">
                            <strong className=" underline">{`${typePrice.type}`}</strong>
                          </p>
                          <p className="text-lg">
                            {`Pickup Price: `}
                            {isNumeric(typePrice.pickupPrice)
                              ? `$${formatStringAsNumber(typePrice.pickupPrice)}`
                              : formatStringAsNumber(typePrice.pickupPrice)}
                          </p>
                          <p className="text-lg">
                            {`Delivery Price: `}
                            {isNumeric(typePrice.deliveryPrice)
                              ? `$${formatStringAsNumber(typePrice.deliveryPrice)}`
                              : formatStringAsNumber(typePrice.deliveryPrice)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <Contact />
    </>
  );
}

export default MaterialsPage;
