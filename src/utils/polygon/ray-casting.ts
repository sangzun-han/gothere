import { Coordinate } from "@/types/coordinate/coordinate";

export const isPointInPolygon = (point: Coordinate, polygon: Coordinate[]): boolean => {
  const { lat: pointLat, lng: pointLng } = point;
  let intersections = 0;

  for (let i = 0; i < polygon.length; i++) {
    const next = (i + 1) % polygon.length;

    const { lat: startLat, lng: startLng } = polygon[i];
    const { lat: endLat, lng: endLng } = polygon[next];

    const isEdgeCrossing =
      startLng > pointLng !== endLng > pointLng &&
      pointLat < ((endLat - startLat) * (pointLng - startLng)) / (endLng - startLng) + startLat;

    if (isEdgeCrossing) {
      intersections++;
    }
  }

  return intersections % 2 === 1;
};
