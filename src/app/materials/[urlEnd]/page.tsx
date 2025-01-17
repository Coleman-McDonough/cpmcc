import { notFound } from "next/navigation"; // Next.js App Router's way of handling 404s
import { MaterialsEntry } from "../../models/EntrySchemas";
import { formatStringAsNumber, isNumeric } from "../../lib/helpers";
import ModalWrapper from "@/components/ModalWrapper";
import Contact from "@/components/Contact";

export const revalidate = 0; // Disable ISR and ensure the page is always fetched dynamically

interface Props {
  params: {
    urlEnd: string; // Dynamic route parameter
  };
}

// Fetch data from either materials, materials, or materials based on the type
async function fetchData(
  urlEnd: string,
  origin: string,
  type: "materials",
): Promise<MaterialsEntry | null> {
  const response = await fetch(`${origin}/api/${type}?urlEnd=${urlEnd}`, {
    cache: "no-store", // Ensure fresh data on each request
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data || null;
}

export default async function MaterialsPage({
  params,
}: {
  params: { urlEnd: string };
}) {
  const origin =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000"; // Fallback to localhost in development

  let entry = await fetchData(params.urlEnd, origin, "materials");

  if (!entry) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto mt-24 max-w-screen-lg bg-white p-4 text-black sm:mt-24">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`/materials`}
            className="rounded bg-red-500 p-4 py-4 text-center text-white hover:bg-red-600"
          >
            ◀ Back
          </a>
          <h1 className="text-center text-2xl font-bold sm:px-16">
            {entry.name}
          </h1>
          <a
            href={`tel:978-375-7001`}
            className="rounded bg-green-500 p-4 py-4 text-center text-white hover:bg-green-600"
          >
            Call Now!
          </a>
        </div>
        <ModalWrapper album={entry.urlEnd}>
          <img
            src={entry.imageUrl}
            alt={entry.name}
            className="mb-4 h-48 w-full rounded object-cover sm:h-96"
          />
        </ModalWrapper>
        <div className="space-y-4">
          <p className="whitespace-pre-wrap rounded border-2 p-4">
            <strong>Description:</strong> {entry.description}
          </p>
          <div className="mt-8">
            <h2
              className={`text-2xl font-semibold ${entry.typesAndPrices.length === 1 ? "hidden" : ""}`}
            >
              Types:
            </h2>
            <div
              className={`mt-4 ${entry.typesAndPrices.length === 1 ? "" : "flex flex-col gap-4 sm:flex-row sm:gap-8"}`}
            >
              {entry.typesAndPrices.map((typePrice, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <h3 className={`text-lg font-bold`}>{typePrice.type}</h3>
                  <p className="text-gray-800">
                    {`Pickup Price: `}
                    {isNumeric(typePrice.pickupPrice)
                      ? `$${formatStringAsNumber(typePrice.pickupPrice)}`
                      : formatStringAsNumber(typePrice.pickupPrice)}
                  </p>
                  <p className="text-gray-800">
                    {`Delivery Price: `}
                    {isNumeric(typePrice.deliveryPrice)
                      ? `$${formatStringAsNumber(typePrice.deliveryPrice)}`
                      : formatStringAsNumber(typePrice.deliveryPrice)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
}
