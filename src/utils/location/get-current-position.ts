type GeolocationError =
  | "BROWSER_NOT_SUPPORTED"
  | "PERMISSION_DENIED"
  | "POSITION_UNAVAILABLE"
  | "TIMEOUT"
  | "UNKNOWN_ERROR";

/**
 * 사용자의 현재 위치 정보를 가져옵니다. (Geolocation API 사용)
 *
 * @returns Promise<GeolocationPosition> - 현재 위치 정보 (latitude, longitude 등)를 포함한 객체를 반환합니다.
 *
 * @throws Error - 아래 에러 상황에 따라 예외를 발생시킵니다:
 * - "BROWSER_NOT_SUPPORTED": 브라우저가 Geolocation API를 지원하지 않는 경우.
 * - "PERMISSION_DENIED": 사용자가 위치 정보 제공을 거부한 경우.
 * - "POSITION_UNAVAILABLE": 위치 정보를 가져올 수 없는 경우.
 * - "TIMEOUT": 위치 정보 요청이 시간 초과된 경우.
 * - "UNKNOWN_ERROR": 알 수 없는 에러가 발생한 경우.
 */
export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("BROWSER_NOT_SUPPORTED"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      (error) => {
        const errorMessages: Record<number, GeolocationError> = {
          [error.PERMISSION_DENIED]: "PERMISSION_DENIED",
          [error.POSITION_UNAVAILABLE]: "POSITION_UNAVAILABLE",
          [error.TIMEOUT]: "TIMEOUT",
        };
        reject(new Error(errorMessages[error.code] || "UNKNOWN_ERROR"));
      },
      {
        enableHighAccuracy: false,
        timeout: 50000,
        maximumAge: 60000,
      }
    );
  });
};
