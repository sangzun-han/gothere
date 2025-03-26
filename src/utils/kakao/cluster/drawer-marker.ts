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
  const text = `+${clusterCount}`;
  const paddingX = 12;

  const radius = 14;

  ctx.font = "bold 13px sans-serif";
  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;

  const boxWidth = textWidth + paddingX * 2;
  const boxHeight = 28;

  const rectX = clusterX - boxWidth / 2;
  const rectY = clusterY - boxHeight / 2;

  ctx.beginPath();
  ctx.moveTo(rectX + radius, rectY);
  ctx.lineTo(rectX + boxWidth - radius, rectY);
  ctx.quadraticCurveTo(rectX + boxWidth, rectY, rectX + boxWidth, rectY + radius);
  ctx.lineTo(rectX + boxWidth, rectY + boxHeight - radius);
  ctx.quadraticCurveTo(rectX + boxWidth, rectY + boxHeight, rectX + boxWidth - radius, rectY + boxHeight);
  ctx.lineTo(rectX + radius, rectY + boxHeight);
  ctx.quadraticCurveTo(rectX, rectY + boxHeight, rectX, rectY + boxHeight - radius);
  ctx.lineTo(rectX, rectY + radius);
  ctx.quadraticCurveTo(rectX, rectY, rectX + radius, rectY);
  ctx.closePath();

  ctx.fillStyle = "#E1325C";
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, clusterX, clusterY + 2);
};

/**
 * 단일 마커를 캔버스에 그리는 함수
 * @param ctx 캔버스 렌더링 컨텍스트
 * @param x 마커 X 좌표
 * @param y 마커 Y 좌표
 */

let cachedImage: HTMLImageElement | null = null;

export const drawSingleMarker = (ctx: CanvasRenderingContext2D, x: number, y: number): void => {
  if (!cachedImage) {
    cachedImage = new Image();
    cachedImage.src = "/marker.svg";
  }

  const draw = () => {
    const originalWidth = cachedImage!.naturalWidth;
    const originalHeight = cachedImage!.naturalHeight;

    // 원하는 고정 너비
    const targetWidth = 16;
    const aspectRatio = originalWidth / originalHeight;
    const targetHeight = targetWidth / aspectRatio;

    ctx.drawImage(cachedImage!, x - targetWidth / 2, y - targetHeight / 2, targetWidth, targetHeight);
  };

  if (!cachedImage.complete) {
    cachedImage.onload = draw;
    return;
  }

  draw();
};
