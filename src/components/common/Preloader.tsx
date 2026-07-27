"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start fading out
    const fadeTimeout = setTimeout(() => {
      setOpacity(0);
    }, 600);

    // Hide completely after fade transition completes
    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 1100);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="dz-preloader-3"
      id="dzPreloader"
      style={{
        transition: "opacity 0.5s ease",
        opacity: opacity,
        pointerEvents: opacity === 0 ? "none" : "auto",
      }}
    >
      <div className="preloader-inner"></div>
    </div>
  );
}
