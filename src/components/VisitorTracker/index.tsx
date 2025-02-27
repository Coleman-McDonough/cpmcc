"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    // Use `window.location.search` to check if the user came from a QR code
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("qr") === "true") {
      console.log("Skipping main page tracking for QR visitor.");
      return;
    }

    fetch("/api/track-main")
      .then((res) => res.json())
      .then((data) => console.log("Tracking Response:", data))
      .catch((error) => console.error("Tracking Error:", error));
  }, []);

  return null; // No UI needed, just runs in the background
}
