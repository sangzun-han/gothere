import { findDongCooridnates } from "@/app/lib/api/find-dong-coordingates";
import { transformCoordinates } from "./transform-coordinates";

/**
 * 주어진 동 이름을 기반으로 폴리곤 경로를 반환합니다.
 *
 * @param dong - 동 이름
 * @returns Promise<{ lat: number; lng: number }[][]> - 변환된 폴리곤 좌표 리스트
 */

export const getPolygonCoordinates = async (dong: string): Promise<{ lat: number; lng: number }[][]> => {
  if (!dong) {
    return [];
  }

  try {
    const coordinatesList = await findDongCooridnates(dong);

    if (!coordinatesList) {
      return [];
    }

    return coordinatesList.flatMap(transformCoordinates);
  } catch (error) {
    console.error("폴리곤 좌표를 가져오는 중 오류가 발생했습니다:", error);
    return [];
  }
};
