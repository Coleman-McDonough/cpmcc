export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { connectToMongodbVisitors } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    if (searchParams.get("qr") === "true") {
      console.log("Skipping logging for QR visitor on main page.");
      return NextResponse.json({ message: "QR visitor, skipping log" });
    }

    const userAgent = req.headers.get("user-agent") || "";
    const deviceType = /mobile|android|iphone|ipad|ipod/i.test(userAgent)
      ? "mobile"
      : "desktop";
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";

    const { db } = await connectToMongodbVisitors();

    await db.collection("mainPage").insertOne({
      _id: new ObjectId(),
      ip,
      deviceType,
      timestamp: new Date().getTime(),
      userAgent: userAgent,
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
