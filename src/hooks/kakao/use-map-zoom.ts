import { useState } from "react";

export default function useMapZoom(initialZoom = 5, maxZoom = 10, minZoom = 1) {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);

  const adjustZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(maxZoom, Math.max(minZoom, prev + delta)));
  };

  return { zoomLevel, adjustZoom };
}
