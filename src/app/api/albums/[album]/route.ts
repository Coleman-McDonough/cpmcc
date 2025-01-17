import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { album: string } },
) {
  const { album } = params;

  try {
    const resources = await cloudinary.search
      .expression(`folder:${album}`)
      .execute();

    return NextResponse.json(
      {
        resources: resources.resources.map((res: CloudinaryResource) => ({
          public_id: res.public_id,
          secure_url: res.secure_url,
        })),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching album images:", error);
    return NextResponse.json(
      { error: "Error fetching album images" },
      { status: 404 },
    );
  }
}
