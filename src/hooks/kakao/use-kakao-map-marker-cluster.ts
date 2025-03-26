import { useCallback, useEffect, useRef } from "react";
import { GeoPost } from "@/types/posts/posts";
import { GeoPostMarker } from "@/types/coordinate/coordinate";
import { clearCanvasElement, resizeCanvasElement } from "@/utils/kakao/cluster/canvas";
import { createClusters } from "@/utils/kakao/cluster/cluster";
import { THRESHOLD_ZOOM_LEVEL } from "@/constants/cluster";
import { drawClusterMarker, drawSingleMarker } from "@/utils/kakao/cluster/drawer-marker";

interface UseCanvasMarkersProps {
  map: kakao.maps.Map;
  geoPosts: GeoPost[];
  isReturning: boolean;
  onMarkersUpdated: (markers: GeoPostMarker[]) => void;
}

export default function useKakaoMapMarkerCluster({
  map,
  geoPosts,
  isReturning,
  onMarkersUpdated,
}: UseCanvasMarkersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerPositionsRef = useRef<GeoPostMarker[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const drawMarkers = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !map) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvasElement(canvas);
    clearCanvasElement(canvas);

    const clusters = createClusters(map, geoPosts, THRESHOLD_ZOOM_LEVEL);
    const zoomLevel = map.getLevel();

    const newMarkerPositions: GeoPostMarker[] = [];

    clusters.forEach(({ x, y, count, posts }) => {
      if (count > 1 && zoomLevel > THRESHOLD_ZOOM_LEVEL) {
        drawClusterMarker(ctx, x, y, count);
      } else {
        drawSingleMarker(ctx, x, y);
        newMarkerPositions.push({ x, y, post: posts[0] });
      }
    });

    markerPositionsRef.current = newMarkerPositions;
    onMarkersUpdated(newMarkerPositions);
  }, [map, geoPosts, onMarkersUpdated]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    clearCanvasElement(canvas);
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

  return {
    canvasRef,
    drawMarkers,
    clearCanvas,
  };
}
