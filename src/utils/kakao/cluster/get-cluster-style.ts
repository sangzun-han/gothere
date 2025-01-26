/**
 * 클러스터 개수에 따라 색상을 결정하는 함수
 * @param count 클러스터의 포스트 개수
 * @returns 색상 문자열
 */

export const getClusterColor = (count: number): string => {
  if (count > 50) return "#FF7043";
  if (count > 30) return "#FFD54F";
  if (count > 15) return "#8BC34A";
  return "#64B5F6";
};

/**
 * 클러스터 개수에 따라 마커 크기를 결정하는 함수
 * @param count 클러스터의 포스트 개수
 * @returns 마커 크기
 */
export const getClusterSize = (count: number): number => {
  return Math.min(15 + count * 2, 55);
};
