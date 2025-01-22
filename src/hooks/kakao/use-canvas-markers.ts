import { GeoPost } from "@/types/posts/posts";
import { useCallback, useEffect, useRef } from "react";

export interface MarkerPosition {
  x: number;
  y: number;
  post: GeoPost;
}

interface UseCanvasMarkersProps {
  map: kakao.maps.Map;
  geoPosts: GeoPost[];
  isReturning: boolean;
  onMarkersUpdated: (markers: MarkerPosition[]) => void;
}

export default function useCanvasMarkers({ map, geoPosts, isReturning, onMarkersUpdated }: UseCanvasMarkersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerPositionsRef = useRef<MarkerPosition[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const MARKER_RADIUS = 4;

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { offsetWidth, offsetHeight } = canvas;
    canvas.width = offsetWidth;
    canvas.height = offsetHeight;
  }, []);

  const drawMarkers = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !map) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const newMarkerPositions: MarkerPosition[] = geoPosts.map((post) => {
      const latlng = new kakao.maps.LatLng(post.latitude, post.longitude);
      const projection = map.getProjection();
      const point = projection.containerPointFromCoords(latlng);
      return { x: point.x, y: point.y, post };
    });

    newMarkerPositions.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, MARKER_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    });

    markerPositionsRef.current = newMarkerPositions;
    onMarkersUpdated(newMarkerPositions);
  }, [map, geoPosts, resizeCanvas, onMarkersUpdated]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    if (isReturning) {
      clearCanvas();
    } else {
      requestAnimationFrame(() => {
        drawMarkers();
      });
    }
  }, [isReturning, drawMarkers, clearCanvas]);

  useEffect(() => {
    drawMarkers();
    const animationFrameId = animationFrameRef.current;

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [drawMarkers]);

  return { canvasRef, drawMarkers, clearCanvas };
}
