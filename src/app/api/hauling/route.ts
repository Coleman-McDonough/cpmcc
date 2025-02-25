// src/app/api/hauling/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  connectToMongodbEquipment,
  connectToMongodbHauling,
  connectToMongodbProperties,
} from "../../lib/mongodb"; // Assuming a separate connection for hauling, similar to properties
import { HaulingEntry } from "@/app/models/EntrySchemas";
import { ObjectId } from "mongodb";
import { generateUniqueUrlEnd } from "@/app/lib/helpers";

// Define allowed origins
const allowedOrigins = ["http://localhost:3000"];

// Function to get CORS headers based on request origin
function getCorsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin");
  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (allowedOrigins.includes(origin || "")) {
    corsHeaders["Access-Control-Allow-Origin"] = origin || "";
  }

  return corsHeaders;
}

// Handle OPTIONS method for CORS preflight
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  const corsHeaders = getCorsHeaders(request);
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// GET: Retrieve all hauling entries or a specific one by _id or urlEnd
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("_id");
    const urlEnd = searchParams.get("urlEnd");

    const { db } = await connectToMongodbHauling();

    if (id) {
      // Fetch a single material by _id
      const objectId = new ObjectId(id);
      const material = await db
        .collection<HaulingEntry>("hauling")
        .findOne({ _id: objectId });

      if (material) {
        return NextResponse.json(material);
      } else {
        return NextResponse.json(
          { message: "Material not found" },
          { status: 404 },
        );
      }
    } else if (urlEnd) {
      // Fetch a single material by `urlEnd`
      const material = await db
        .collection<HaulingEntry>("hauling")
        .findOne({ urlEnd });

      if (material) {
        return NextResponse.json(material);
      } else {
        return NextResponse.json(
          { message: "Material not found" },
          { status: 404 },
        );
      }
    } else {
      // Fetch all hauling if no specific id or urlEnd is provided
      const hauling = await db
        .collection<HaulingEntry>("hauling")
        .find({})
        .toArray();
      return NextResponse.json(hauling);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data from MongoDB:", error.message);
      return NextResponse.json(
        { message: `Failed to fetch data: ${error.message}` },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 },
    );
  }
}
