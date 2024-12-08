import proj4 from "proj4";
import { isValidCoordinate } from "./coordinate-validator";

const UTMK = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
const WGS84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

export interface Coordinate {
  lat: number;
  lng: number;
}

export const transformCoordinates = (multiPolygon: [number, number][][]): Coordinate[][] => {
  const transformer = proj4(UTMK, WGS84);

  return multiPolygon.map((polygon: [number, number][]) =>
    polygon
      .map(([x, y]: [number, number]) => {
        const [lng, lat] = transformer.forward([x, y]);
        return { lat, lng };
      })
      .filter(isValidCoordinate)
  );
};
