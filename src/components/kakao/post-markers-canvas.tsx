"use client";

import { useEffect, useRef, useState } from "react";
import { GeoPost } from "@/types/posts/posts";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import Image from "next/image";

interface PostMarkersCanvasProps {
  map: kakao.maps.Map;
  geoPosts: GeoPost[];
  isReturning: boolean;
}

interface MarkerPosition {
  x: number;
  y: number;
  post: GeoPost;
}

const menuHeight = 65.5;
const MARKER_RADIUS = 4; // 그리는 원의 반지름
const HIT_AREA_SIZE = 12;

export default function PostMarkersCanvas({ map, geoPosts, isReturning }: PostMarkersCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [selectedPost, setSelectedPost] = useState<GeoPost | null>(null);
  const markerPositionsRef = useRef<MarkerPosition[]>([]);

  useEffect(() => {
    if (!map || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const { offsetWidth, offsetHeight } = canvas;
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
    };

    const drawMarkersOnCanvas = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      resizeCanvas();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const newMarkerPositions: MarkerPosition[] = [];

      geoPosts.forEach((post) => {
        const latlng = new kakao.maps.LatLng(post.latitude, post.longitude);
        const projection = map.getProjection();
        const point = projection.containerPointFromCoords(latlng);

        newMarkerPositions.push({
          x: point.x,
          y: point.y,
          post,
        });

        ctx.beginPath();
        ctx.arc(point.x, point.y, MARKER_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      });
      canvas.style.display = "block";
      markerPositionsRef.current = newMarkerPositions;
    };

    const scheduleDraw = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(drawMarkersOnCanvas);
    };

    const onZoomStart = () => {
      setIsZooming(true);
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      setSelectedPost(null);
      canvas.style.display = "none";
    };

    const onZoomChanged = () => {
      setIsZooming(false);
      scheduleDraw();
    };

    const onCenterChanged = () => {
      if (!isZooming) {
        scheduleDraw();
      }
    };

    if (isReturning) {
      onZoomStart();
    } else {
      onZoomChanged();
    }
    kakao.maps.event.addListener(map, "center_changed", onCenterChanged);
    kakao.maps.event.addListener(map, "zoom_start", onZoomStart);
    kakao.maps.event.addListener(map, "zoom_changed", onZoomChanged);

    scheduleDraw();

    return () => {
      kakao.maps.event.removeListener(map, "center_changed", onCenterChanged);
      kakao.maps.event.removeListener(map, "zoom_start", onZoomStart);
      kakao.maps.event.removeListener(map, "zoom_changed", onZoomChanged);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [map, geoPosts, isZooming, isReturning]);

  // 마커 hit 영역을 렌더링하기 위한 JSX를 생성합니다.
  // markerPositionsRef.current 값이 바뀔 때마다 리렌더링하도록, 예를 들어 상태에 저장하거나
  // 별도로 force update 처리가 필요하지만, 여기서는 간단하게 markerPositionsRef.current를 직접 사용합니다.
  // 참고: 이 예시는 간단하게 하기 위한 것으로, markerPositionsRef.current 업데이트 시 React가 자동 리렌더링하지는 않습니다.
  // 이 경우, 마커 좌표를 별도의 상태(state)로 관리하는 방법도 있습니다.
  // 여기서는 예시로, 캔버스와 함께 사용한 후, 부모 컴포넌트 렌더링이나 다른 효과로 인해 좌표가 업데이트된다고 가정합니다.

  const renderHitAreas = () => {
    // markerPositionsRef.current의 각 마커에 대해 클릭 영역(div)을 생성
    return markerPositionsRef.current.map((marker, idx) => {
      // 히트 영역은 캔버스 상 마커 좌표를 기준으로 배치됨
      // 좌표는 왼쪽 상단 기준 위치로 변환 (히트 영역 크기의 절반만큼 빼줌)
      const left = marker.x - HIT_AREA_SIZE / 2;
      const top = marker.y - HIT_AREA_SIZE / 2;
      return (
        <div
          key={idx}
          style={{
            position: "absolute",
            left: left,
            top: top,
            width: HIT_AREA_SIZE,
            height: HIT_AREA_SIZE,
            // 배경은 투명하지만, pointer events는 허용
            backgroundColor: "transparent",
            pointerEvents: "auto",
            // 마우스 커서를 포인터로 변경
            cursor: "pointer",
            zIndex: 45,
          }}
          onClick={(e) => {
            e.stopPropagation(); // 클릭이 지도에 전파되지 않게 함
            console.log("히트 영역 클릭", marker);
            setSelectedPost(marker.post);
          }}
        />
      );
    });
  };

  return (
    <>
      {/* 캔버스는 렌더링 전용 */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: `calc(100% - ${menuHeight}px)`,
          bottom: `${menuHeight}px`,
          left: "0",
          pointerEvents: "none",
          zIndex: "40",
        }}
      />
      {/* 지도 전체에 위치한 컨테이너. 이 컨테이너는 기본적으로 pointerEvents none; 
          하지만 히트 영역은 별도로 생성되어 클릭 이벤트를 처리합니다. */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: `calc(100% - ${menuHeight}px)`,
          bottom: `${menuHeight}px`,
          left: "0",
          pointerEvents: "none",
          zIndex: "45",
        }}
      >
        {renderHitAreas()}
      </div>
      {selectedPost && (
        <CustomOverlayMap
          position={{
            lat: selectedPost.latitude,
            lng: selectedPost.longitude,
          }}
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-text-primary rounded-lg flex items-center justify-center p-[3px]">
              <div className="w-full h-full rounded-md overflow-hidden">
                <Image
                  src={selectedPost.thumbnail || "https://via.placeholder.com/42"}
                  alt={selectedPost.title}
                  className="object-cover w-full h-full"
                  width={42}
                  height={42}
                  blurDataURL={selectedPost.thumbnail_blur_image}
                  placeholder="blur"
                />
              </div>
            </div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}
