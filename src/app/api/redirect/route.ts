import { NextRequest, NextResponse } from "next/server";
import { connectToMongodbQrVisitors } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const userAgent = req.headers.get("user-agent") || "";
    let deviceType = /mobile|android|iphone|ipad|ipod/i.test(userAgent)
      ? "mobile"
      : "desktop";

    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";

    const { db } = await connectToMongodbQrVisitors();

    // Log the QR visitor
    await db.collection("visitorLogs").insertOne({
      _id: new ObjectId(),
      ip,
      deviceType,
      userAgent,
      timestamp: new Date(),
      source: "QR Code",
    });

    console.log(`QR Visitor Logged: ${ip}`);

    // Redirect to the main page with a flag to prevent duplicate logging
    return NextResponse.redirect(
      "https://www.cpmcdonoughconstructioncorp.com/?qr=true",
    );
  } catch (error) {
    console.error("QR Tracking Error:", error);
    return NextResponse.json(
      { message: "Failed to track QR visitor" },
      { status: 500 },
    );
  }
}
