import { NextRequest, NextResponse } from "next/server";
import {
  connectToMongodbQrVisitors,
  connectToMongodbMainVisitors,
} from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  try {
    const userAgent = req.headers.get("user-agent") || "";
    let deviceType = "unknown";

    if (/mobile|android|iphone|ipad|ipod/i.test(userAgent)) {
      deviceType = "mobile";
    } else if (/tablet|ipad/i.test(userAgent)) {
      deviceType = "tablet";
    } else {
      deviceType = "desktop";
    }

    // Get user IP
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";

    // Generate or retrieve visitor UUID from cookies
    let visitorId = req.cookies.get("visitor_id")?.value;
    if (!visitorId) {
      visitorId = uuidv4(); // Generate a new UUID
    }

    // Check if the visitor came through QR Code (URL contains ?qr=true)
    const url = new URL(req.url);
    const isQrVisitor = url.searchParams.get("qr") === "true";

    const db = isQrVisitor
      ? await connectToMongodbQrVisitors()
      : await connectToMongodbMainVisitors();

    // Check if the visitor is already logged in any of the databases
    const existingVisitor = await db.db
      .collection("visitorLogs")
      .findOne({ visitorId });

    if (!existingVisitor) {
      // Save the new visitor entry
      const visitorEntry = {
        _id: new ObjectId(),
        visitorId,
        ip,
        deviceType,
        userAgent,
        timestamp: new Date(),
        source: isQrVisitor ? "QR Code" : "Main Page",
      };

      await db.db.collection("visitorLogs").insertOne(visitorEntry);

      console.log(
        `New Visitor Logged: Device - ${deviceType}, IP - ${ip}, Source - ${visitorEntry.source}`,
      );
    } else {
      console.log(`Returning Visitor: ${visitorId} (Already Logged)`);
    }

    // Set a cookie to track this user (valid for 30 days)
    const response = NextResponse.redirect(
      "https://www.cpmcdonoughconstructioncorp.com/",
    );
    response.cookies.set("visitor_id", visitorId, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Error tracking visitor:", error);
    return NextResponse.json(
      { message: "Failed to track visitor" },
      { status: 500 },
    );
  }
}
