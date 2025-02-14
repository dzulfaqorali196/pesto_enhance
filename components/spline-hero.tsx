"use client";

import { useEffect, useState } from "react";

export default function SplineHero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <video
      src="/hero.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-auto object-cover"
    >
      Your browser does not support the video tag.
    </video>
  );
}
