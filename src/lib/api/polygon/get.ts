import { Coordinate, PolygonApiResponse } from "@/types/coordinate/coordinate";
import { transformCoordinates } from "@/utils/coordinates/transform-coordinates";

/**
 * Supabase API를 통해 동 이름에 해당하는 폴리곤 데이터를 가져옵니다.
 *
 * @param dong - 동 이름
 * @returns Promise<Coordinate[][]> - 변환된 폴리곤 좌표 리스트
 */

export async function getPolygonCoordinates(dong: string): Promise<Coordinate[][]> {
  const response = await fetch(`/api/polygon?dong=${encodeURIComponent(dong)}`);
  const result: PolygonApiResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch polygon data.");
  }

  const data = result.data;
  if (!data || data.length === 0) return [];

  const transformedCoordinates = data.map((polygon) => transformCoordinates(polygon.coordinates));
  return transformedCoordinates.flat();
}
