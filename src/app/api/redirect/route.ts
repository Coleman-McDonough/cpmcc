export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { connectToMongodbQrVisitors } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const userAgent = req.headers.get("user-agent") || "";
    const deviceType = /mobile|android|iphone|ipad|ipod/i.test(userAgent)
      ? "mobile"
      : "desktop";
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";

    const { db } = await connectToMongodbQrVisitors();

    await db.collection("visitorLogs").insertOne({
      _id: new ObjectId(),
      ip,
      deviceType,
      userAgent,
      timestamp: new Date(),
      source: "QR Code",
    });

    console.log(`QR Visitor Logged: ${ip}`);

    // Redirect to main page with `?qr=true` to prevent duplicate tracking
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
