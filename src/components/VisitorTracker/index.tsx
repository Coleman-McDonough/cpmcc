"use client";

import { useEffect, useState } from "react";

export default function VisitorTracker() {
  const [fromQr, setFromQr] = useState(false);

  useEffect(() => {
    // Use the browser's URL to get query parameters
    const searchParams = new URLSearchParams(window.location.search);
    setFromQr(searchParams.get("qr") === "true");
  }, []);

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
