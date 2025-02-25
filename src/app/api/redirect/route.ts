import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

  // Store tracking data in your database or log it (Example: console log for now)
  console.log(`Device: ${deviceType}, IP: ${ip}`);

  // Redirect to the main page
  return NextResponse.redirect("https://www.cpmcdonoughconstructioncorp.com/");
}
