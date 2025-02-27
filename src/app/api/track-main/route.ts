import { NextRequest, NextResponse } from "next/server";
import { connectToMongodbMainVisitors } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fromQr = searchParams.get("qr") === "true"; // Check if user came from QR code

    if (fromQr) {
      console.log("Skipping logging for QR visitor on main page.");
      return NextResponse.json({ message: "QR visitor, skipping log" });
    }

    const userAgent = req.headers.get("user-agent") || "";
    let deviceType = /mobile|android|iphone|ipad|ipod/i.test(userAgent)
      ? "mobile"
      : "desktop";

    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";

    const { db } = await connectToMongodbMainVisitors();

    // Log the main page visitor
    await db.collection("visitorLogs").insertOne({
      _id: new ObjectId(),
      ip,
      deviceType,
      userAgent,
      timestamp: new Date(),
      source: "Main Page",
    });

    console.log(`Main Page Visitor Logged: ${ip}`);

    return NextResponse.json({ message: "Main page visitor logged" });
  } catch (error) {
    console.error("Main Page Tracking Error:", error);
    return NextResponse.json(
      { message: "Failed to track visitor" },
      { status: 500 },
    );
  }
}
