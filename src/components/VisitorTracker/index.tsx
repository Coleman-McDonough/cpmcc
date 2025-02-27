"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VisitorTracker() {
  const searchParams = useSearchParams();
  const fromQr = searchParams.get("qr") === "true"; // Check if user came from QR code

  useEffect(() => {
    if (!fromQr) {
      fetch("/api/track-main")
        .then((res) => res.json())
        .then((data) => console.log("Tracking Response:", data))
        .catch((error) => console.error("Tracking Error:", error));
    } else {
      console.log("Skipping main page tracking for QR visitor.");
    }
  }, [fromQr]);

  return null;
}
