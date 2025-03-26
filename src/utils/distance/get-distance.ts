export const getDistance = (latitude1: number, longitude1: number, latitude2: number, longitude2: number) => {
  const EARTH_RADIUS_METERS = 6371e3; // 지구 반지름 (미터 단위)
  const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180; // 도(degree) → 라디안 변환 함수

  const lat1Radians = degreesToRadians(latitude1);
  const lat2Radians = degreesToRadians(latitude2);
  const deltaLatitude = degreesToRadians(latitude2 - latitude1);
  const deltaLongitude = degreesToRadians(longitude2 - longitude1);

  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

  const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * centralAngle;
};
