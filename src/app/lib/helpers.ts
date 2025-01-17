import { Db } from "mongodb";
import {
  EquipmentEntry,
  MaterialsEntry,
  PropertyEntry,
} from "../models/EntrySchemas";

// Helper to check if a string is a valid number
export function isNumeric(input: string): boolean {
  return /^[0-9]+$/.test(input);
}

// Helper to convert square feet to acres
export function convertSquareFeetToAcres(
  squareFeetString: string,
): number | null {
  const squareFeet = parseFloat(squareFeetString);

  if (isNaN(squareFeet)) {
    console.error("Invalid input: Please provide a valid number as a string.");
    return null; // Return null for invalid input
  }

  const acres = squareFeet / 43560; // 1 acre = 43,560 square feet
  return Math.round(acres * 100) / 100; // Round to 2 decimal places
}

// Helper function to generate a unique urlEnd by adding a suffix if needed
export async function generateUniqueUrlEnd(
  pdb: Db,
  edb: Db,
  mdb: Db,
  baseUrlEnd: string,
): Promise<string> {
  let uniqueUrlEnd = baseUrlEnd;
  let counter = 1;

  // Keep checking if a document with the same urlEnd already exists making sure to check the collections equipment and materials as well as properties
  while (
    (await pdb
      .collection<PropertyEntry>("properties")
      .findOne({ urlEnd: uniqueUrlEnd })) ||
    (await edb
      .collection<EquipmentEntry>("equipment")
      .findOne({ urlEnd: uniqueUrlEnd })) ||
    (await mdb
      .collection<MaterialsEntry>("materials")
      .findOne({ urlEnd: uniqueUrlEnd }))
  ) {
    uniqueUrlEnd = `${baseUrlEnd}-${counter}`;
    counter += 1;
  }

  return uniqueUrlEnd;
}

export function formatStringAsNumber(input: string): string {
  // Try to convert the string to a number
  const numberValue = parseFloat(input);

  // Check if the conversion is valid (not NaN)
  if (!isNaN(numberValue)) {
    // Return the number formatted with commas
    return numberValue.toLocaleString(); // Adds commas appropriately
  } else {
    // If it's not a valid number, return the original input
    return input;
  }
}

// Update property, equipment, or material
export async function updateItem(
  item: PropertyEntry | EquipmentEntry | MaterialsEntry,
  type: "property" | "equipment" | "materials",
) {
  const response = await fetch(`/api/${type}?_id=${item._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to update item");
  }

  return response.json();
}

// Delete property, equipment, or material
export async function deleteItem(
  id: string,
  type: "property" | "equipment" | "materials",
) {
  const response = await fetch(`/api/${type}?_id=${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }

  return response.json();
}
