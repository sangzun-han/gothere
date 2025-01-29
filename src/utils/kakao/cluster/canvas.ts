/**
 * 캔버스 요소를 지우는 함수
 * @param canvas 지울 캔버스 요소
 */
export const clearCanvasElement = (canvas: HTMLCanvasElement): void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * 캔버스 요소의 크기를 리사이즈하는 함수
 * @param canvas 리사이즈할 캔버스 요소
 */
export const resizeCanvasElement = (canvas: HTMLCanvasElement): void => {
  const { offsetWidth, offsetHeight } = canvas;
  canvas.width = offsetWidth;
  canvas.height = offsetHeight;
};
