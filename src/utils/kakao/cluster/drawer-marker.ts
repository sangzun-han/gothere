import { MARKER_RADIUS } from "@/constants/cluster";
import { getClusterColor, getClusterSize } from "./get-cluster-style";

/**
 * 클러스터 마커를 캔버스에 그리는 함수
 * @param ctx 캔버스 렌더링 컨텍스트
 * @param clusterX 클러스터 X 좌표
 * @param clusterY 클러스터 Y 좌표
 * @param clusterCount 클러스터 포스트 개수
 */
export const drawClusterMarker = (
  ctx: CanvasRenderingContext2D,
  clusterX: number,
  clusterY: number,
  clusterCount: number
): void => {
  const clusterSize = getClusterSize(clusterCount);
  const color = getClusterColor(clusterCount);

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(clusterX, clusterY, clusterSize, 0, 2 * Math.PI);
  ctx.fill();

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();

  ctx.fillStyle = "white";
  ctx.font = `bold ${Math.max(14, clusterSize / 3)}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(clusterCount.toString(), clusterX, clusterY);
};

/**
 * 단일 마커를 캔버스에 그리는 함수
 * @param ctx 캔버스 렌더링 컨텍스트
 * @param x 마커 X 좌표
 * @param y 마커 Y 좌표
 */
export const drawSingleMarker = (ctx: CanvasRenderingContext2D, x: number, y: number): void => {
  ctx.beginPath();
  ctx.arc(x, y, MARKER_RADIUS, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
};
