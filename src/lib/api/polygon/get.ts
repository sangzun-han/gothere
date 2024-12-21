import { Coordinate } from "@/types/coordinate/coordinate";
import { transformCoordinates } from "@/utils/coordinates/transform-coordinates";

interface Feature {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][];
  };
  properties: {
    EMD_CD: string;
    EMD_ENG_NM: string;
    EMD_KOR_NM: string;
  };
}

interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

/**
 * 주어진 동 이름을 기반으로 변환된 폴리곤 경로를 반환합니다.
 *
 * @param dong - 동 이름
 * @returns Promise<Coordinate[][]> - 변환된 폴리곤 좌표 리스트
 */

export async function getPolygonCoordinates(dong: string): Promise<Coordinate[][]> {
  const response = await fetch("../dong.json");
  const data: FeatureCollection = await response.json();

  const matchingFeatures = data.features.filter((feature: Feature) => feature.properties.EMD_KOR_NM === dong);

  if (matchingFeatures.length === 0) return [];

  const coordinatesList = matchingFeatures.map((feature: Feature) => feature.geometry.coordinates);

  if (!coordinatesList || coordinatesList.length === 0) return [];

  return coordinatesList.flatMap(transformCoordinates);
}
