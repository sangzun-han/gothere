/**
 * 특정 좌표를 그리드 셀로 변환
 * @param lat 위도
 * @param lng 경도
 * @param cellSize 셀 크기
 * @returns x, y 그리드 좌표
 */

export const getGridCoordinates = (lat: number, lng: number, cellSize: number) => {
  const x = Math.floor(lng / cellSize);
  const y = Math.floor(lat / cellSize);
  return { x, y };
};
