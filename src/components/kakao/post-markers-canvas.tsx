"use client";

import React, { useCallback, useRef, useState } from "react";
import { GeoPost } from "@/types/posts/posts";
import MapCanvas from "./widgets/map-canvas";
import OverlayContainer from "./widgets/overlay-container";
import ConditionalRender from "./widgets/conditional-render";
import PostOverlay from "./widgets/post-overlay";
import MapMarkerClickArea from "./widgets/map-marker-click-area";
import useKakaoMapMarkerCluster from "@/hooks/kakao/use-kakao-map-marker-cluster";
import { useMapEventHandler } from "@/hooks/kakao";
import { GeoPostMarker } from "@/types/coordinate/coordinate";

interface PostMarkersCanvasProps {
  map: kakao.maps.Map;
  geoPosts: GeoPost[];
  isReturning: boolean;
}

const PostMarkersCanvas: React.FC<PostMarkersCanvasProps> = ({ map, geoPosts, isReturning }) => {
  const markerPositionsRef = useRef<GeoPostMarker[]>([]);
  const selectedPostRef = useRef<GeoPost | null>(null);
  const [selectedPost, setSelectedPost] = useState<GeoPost | null>(null);
  const [isZooming, setIsZooming] = useState<boolean>(false);

  const handleMarkersUpdated = useCallback((markers: GeoPostMarker[]) => {
    markerPositionsRef.current = markers;
  }, []);

  const { canvasRef, drawMarkers, clearCanvas } = useKakaoMapMarkerCluster({
    map,
    geoPosts,
    isReturning,
    onMarkersUpdated: handleMarkersUpdated,
  });

  const handleCenterChanged = useCallback(() => {
    if (!isZooming) drawMarkers();
  }, [isZooming, drawMarkers]);

  const handleZoomStart = useCallback(() => {
    setIsZooming(true);
    clearCanvas();
  }, [clearCanvas]);

  const handleZoomEnd = useCallback(() => {
    setIsZooming(false);
    drawMarkers();
  }, [drawMarkers]);

  useMapEventHandler({
    map,
    onCenterChanged: handleCenterChanged,
    onZoomStart: handleZoomStart,
    onZoomEnd: handleZoomEnd,
  });

  const handleMarkerHover = useCallback((marker: GeoPostMarker) => {
    selectedPostRef.current = marker.post;
    setSelectedPost(marker.post);
  }, []);

  const handleCloseOverlay = useCallback(() => {
    selectedPostRef.current = null;
    setSelectedPost(null);
  }, []);

  return (
    <>
      <MapCanvas ref={canvasRef}>
        <OverlayContainer>
          <ConditionalRender condition={!!selectedPost}>
            <PostOverlay post={selectedPost!} onClose={handleCloseOverlay} isReturning={isReturning} />
          </ConditionalRender>
        </OverlayContainer>
      </MapCanvas>

      <MapMarkerClickArea
        markers={markerPositionsRef.current}
        onMarkerHover={(marker) => {
          handleMarkerHover(marker);
        }}
        onMarkerLeave={() => {
          handleCloseOverlay();
        }}
      />
    </>
  );
};

export default PostMarkersCanvas;
