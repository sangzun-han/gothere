/**
 * 줌 레벨에 따라 셀 크기를 계산
 * @param zoomLevel 지도 줌 레벨
 * @returns 셀 크기
 */
export const calculateCellSize = (zoomLevel: number): number => {
  if (zoomLevel > 5) return 0.005;
  return 0.01;
};
