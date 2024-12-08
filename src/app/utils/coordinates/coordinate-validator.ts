export interface Coordinate {
  lat: number;
  lng: number;
}

export const isValidCoordinate = (coord: { lat: number; lng: number }): coord is Coordinate => {
  return typeof coord.lat === "number" && typeof coord.lng === "number" && isFinite(coord.lat) && isFinite(coord.lng);
};
