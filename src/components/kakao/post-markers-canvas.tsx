"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { GeoPost } from "@/types/posts/posts";

import Image from "next/image";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

// Constants
const MENU_HEIGHT = 65.5;
const MARKER_RADIUS = 4;
const HIT_AREA_SIZE = 12;
const OVERLAY_OFFSET_Y = -120;

// Types
interface PostMarkersCanvasProps {
  map: kakao.maps.Map;
  geoPosts: GeoPost[];
  isReturning: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface PortalProps {
  children: React.ReactNode;
}

interface PostOverlayProps {
  post: GeoPost;
  onClose: () => void;
  position: Position;
  isReturning: boolean;
}

interface MarkerPosition {
  x: number;
  y: number;
  post: GeoPost;
}

const PostOverlay: React.FC<PostOverlayProps> = ({ post, onClose, position, isReturning }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlayParent = overlayRef.current?.parentElement?.parentElement;
    if (overlayParent) {
      overlayParent.style.zIndex = "50";
      overlayParent.style.transition = "opacity 0.3s";
      overlayParent.style.opacity = isReturning ? "0" : "1";
    }
  }, [isReturning]);

  return (
    <CustomOverlayMap position={{ lat: post.latitude, lng: post.longitude }} yAnchor={1.05}>
      <div className="relative w-72 bg-white rounded-lg shadow-lg p-3" ref={overlayRef}>
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-semibold">{post.title}</h3>
        </div>

        <div className="flex mt-2">
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={post.thumbnail || "https://via.placeholder.com/64"}
              alt={post.title}
              className="object-cover w-full h-full"
              width={64}
              height={64}
              blurDataURL={post.thumbnail_blur_image}
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-gray-500">{post.location}</p>
          </div>
        </div>

        <div className="mt-3 flex justify-between">
          <button className="text-blue-600 text-sm hover:underline">상세보기</button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm shadow">닫기</button>
        </div>
      </div>
    </CustomOverlayMap>
  );
};

const PostMarkersCanvas: React.FC<PostMarkersCanvasProps> = ({ map, geoPosts, isReturning }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const markerPositionsRef = useRef<MarkerPosition[]>([]);
  const selectedPostRef = useRef<GeoPost | null>(null);

  const [isZooming, setIsZooming] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<GeoPost | null>(null);
  const [overlayPosition, setOverlayPosition] = useState<Position>({ x: 0, y: 0 });

  const updateOverlayPosition = useCallback(() => {
    if (selectedPostRef.current && map) {
      const post = selectedPostRef.current;
      const latlng = new kakao.maps.LatLng(post.latitude, post.longitude);
      const projection = map.getProjection();
      const point = projection.containerPointFromCoords(latlng);
      setOverlayPosition({ x: point.x, y: point.y });
    }
  }, [map]);

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

    canvas.style.display = "block";
    markerPositionsRef.current = newMarkerPositions;

    // 오버레이 위치 업데이트
    updateOverlayPosition();
  }, [map, geoPosts, resizeCanvas, updateOverlayPosition]);

  const handleZoomStart = useCallback(() => {
    setIsZooming(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.style.display = "none";
  }, []);

  const handleZoomEnd = useCallback(() => {
    setIsZooming(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(drawMarkers);
  }, [drawMarkers]);

  const handleCenterChanged = useCallback(() => {
    if (!isZooming) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(drawMarkers);
    }
  }, [isZooming, drawMarkers]);

  const handleMarkerClick = useCallback((marker: MarkerPosition) => {
    selectedPostRef.current = marker.post;
    setSelectedPost(marker.post);
    setOverlayPosition({ x: marker.x, y: marker.y });
  }, []);

  const handleCloseOverlay = useCallback(() => {
    selectedPostRef.current = null;
    setSelectedPost(null);
  }, []);

  useEffect(() => {
    if (!map) return;
    if (isReturning) {
      handleZoomStart();
    } else {
      requestAnimationFrame(() => {
        handleZoomEnd();
        drawMarkers();
      });
    }

    // 이벤트 리스너 등록
    kakao.maps.event.addListener(map, "center_changed", handleCenterChanged);
    kakao.maps.event.addListener(map, "zoom_start", handleZoomStart);
    kakao.maps.event.addListener(map, "zoom_changed", handleZoomEnd);
    kakao.maps.event.addListener(map, "dragstart", handleCenterChanged);
    kakao.maps.event.addListener(map, "drag", handleCenterChanged);
    kakao.maps.event.addListener(map, "dragend", handleCenterChanged);

    return () => {
      // 이벤트 리스너 제거
      kakao.maps.event.removeListener(map, "center_changed", handleCenterChanged);
      kakao.maps.event.removeListener(map, "zoom_start", handleZoomStart);
      kakao.maps.event.removeListener(map, "zoom_changed", handleZoomEnd);
      kakao.maps.event.removeListener(map, "dragstart", handleCenterChanged);
      kakao.maps.event.removeListener(map, "drag", handleCenterChanged);
      kakao.maps.event.removeListener(map, "dragend", handleCenterChanged);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [map, isReturning, handleCenterChanged, handleZoomStart, handleZoomEnd]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: `calc(100% - ${MENU_HEIGHT}px)`,
          bottom: `${MENU_HEIGHT}px`,
          left: "0",
          pointerEvents: "none",
          zIndex: 40,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "100%",
          height: `calc(100% - ${MENU_HEIGHT}px)`,
          bottom: `${MENU_HEIGHT}px`,
          left: "0",
          pointerEvents: "none",
          zIndex: 45,
        }}
      >
        {markerPositionsRef.current.map((marker, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: marker.x - HIT_AREA_SIZE / 2,
              top: marker.y - HIT_AREA_SIZE / 2,
              width: HIT_AREA_SIZE,
              height: HIT_AREA_SIZE,
              backgroundColor: "transparent",
              pointerEvents: "auto",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleMarkerClick(marker);
            }}
          />
        ))}
      </div>

      {selectedPost && (
        <PostOverlay
          post={selectedPost}
          onClose={handleCloseOverlay}
          position={overlayPosition}
          isReturning={isReturning}
        />
      )}
    </>
  );
};

export default PostMarkersCanvas;
