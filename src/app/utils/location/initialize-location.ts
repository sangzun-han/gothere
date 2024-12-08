import { getCurrentPosition } from "./get-current-position";
import { getAdminDistrict } from "./get-admin-district";

export type LocationError =
  | "PERMISSION_DENIED"
  | "POSITION_UNAVAILABLE"
  | "TIMEOUT"
  | "BROWSER_NOT_SUPPORTED"
  | "KAKAO_MAP_NOT_LOADED"
  | "KAKAO_MAP_ERROR"
  | "ADMIN_DISTRICT_ERROR"
  | "UNKNOWN_ERROR";

export const ERROR_MESSAGES: Record<LocationError, string> = {
  PERMISSION_DENIED: "사용자가 위치 정보를 제공하는 것을 거부했습니다.",
  POSITION_UNAVAILABLE: "위치 정보를 사용할 수 없습니다.",
  TIMEOUT: "위치 정보를 가져오는 요청이 시간 초과되었습니다.",
  BROWSER_NOT_SUPPORTED: "이 브라우저에서는 위치 정보를 지원하지 않습니다.",
  KAKAO_MAP_NOT_LOADED: "카카오맵이 로드되지 않았습니다. 잠시 후 다시 시도해주세요.",
  KAKAO_MAP_ERROR: "카카오맵을 로드하는 중 오류가 발생했습니다.",
  ADMIN_DISTRICT_ERROR: "행정 구역 정보를 가져오지 못했습니다.",
  UNKNOWN_ERROR: "알 수 없는 오류가 발생했습니다.",
};

export interface LocationData {
  latitude: number;
  longitude: number;
  si: string;
  gu: string;
  dong: string;
}

/**
 * 현재 위치 정보를 기반으로 행정구역 데이터를 초기화합니다.
 * Initializes the user's location and retrieves administrative district details (시/군/구/동).
 *
 * @returns {Promise<LocationData>} - 위치 정보와 행정구역 데이터를 포함한 객체를 반환합니다.
 * - `latitude`: 위도 (latitude).
 * - `longitude`: 경도 (longitude).
 * - `si`: 시/도 이름.
 * - `gu`: 구 이름.
 * - `dong`: 동 이름.
 *
 * @throws {Error} - 위치 데이터를 가져오는 중 발생할 수 있는 에러를 설명합니다.
 * - `PERMISSION_DENIED`: 사용자가 위치 정보 제공을 거부한 경우.
 * - `POSITION_UNAVAILABLE`: 위치 정보를 가져올 수 없는 경우.
 * - `TIMEOUT`: 위치 정보 요청이 시간 초과된 경우.
 * - `BROWSER_NOT_SUPPORTED`: 브라우저가 위치 정보를 지원하지 않는 경우.
 * - `KAKAO_MAP_ERROR`: Kakao 지도 서비스 사용 중 오류가 발생한 경우.
 * - `ADMIN_DISTRICT_ERROR`: 행정구역 정보를 가져오지 못한 경우.
 * - `UNKNOWN_ERROR`: 알 수 없는 에러가 발생한 경우.
 *
 *
 * */

export const initializeLocation = async (): Promise<LocationData> => {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const { si, gu, dong } = await getAdminDistrict(latitude, longitude);

    return { latitude, longitude, si, gu, dong };
  } catch (error) {
    const errorKey = error as LocationError;
    throw new Error(ERROR_MESSAGES[errorKey] || ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
