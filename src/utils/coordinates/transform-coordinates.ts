import proj4 from "proj4";
import { isValidCoordinate } from "./coordinate-validator";

const UTMK = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
const WGS84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

export interface Coordinate {
  lat: number;
  lng: number;
}

/**
 * 다중 폴리곤 데이터를 변환합니다.
 * 중첩된 배열 구조도 처리합니다.
 * @param multiPolygon - 다중 폴리곤 데이터
 * @returns 변환된 좌표 배열
 */
export const transformCoordinates = (multiPolygon: any): Coordinate[][] => {
  const transformer = proj4(UTMK, WGS84);

  const processPolygon = (polygon: any): Coordinate[] => {
    if (!Array.isArray(polygon)) {
      console.error("폴리곤 데이터가 배열이 아닙니다:", polygon);
      return [];
    }

    return polygon
      .flatMap((point: any) => {
        if (Array.isArray(point[0])) {
          // 중첩된 배열 처리
          return processPolygon(point);
        }

        if (!Array.isArray(point) || point.length !== 2) {
          console.error("잘못된 좌표 데이터:", point);
          return null;
        }

        const [lng, lat] = transformer.forward([point[0], point[1]]);
        if (isNaN(lng) || isNaN(lat)) {
          console.error("좌표 변환 실패:", point);
          return null;
        }

        return { lat, lng };
      })
      .filter((coordinate) => coordinate !== null && isValidCoordinate(coordinate)) as Coordinate[];
  };

  if (!Array.isArray(multiPolygon)) {
    console.error("입력 데이터가 다중 폴리곤 배열이 아닙니다:", multiPolygon);
    return [];
  }

  return multiPolygon.map((polygon: any) => processPolygon(polygon));
};
