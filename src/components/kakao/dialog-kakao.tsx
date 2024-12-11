"use client";

import { useMapZoom } from "@/hooks/kakao";
import { useGeoLocation, useMapCenter } from "@/hooks/location";
import { Map } from "react-kakao-maps-sdk";
import MyMarker from "./my-marker";
import KakaoPolygon from "./kakao-polygon";
import MapZoomControl from "./map-zoom-control";
import ReturnToLocationButton from "./return-to-location-button";
import KakaoMapLoading from "./kakao-map-loading";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function DialogKakao({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { location, isKakaoLoading } = useGeoLocation();
  const { zoomLevel, adjustZoom } = useMapZoom();
  const { currentCenter, updateCenter, returnToInitialLocation } = useMapCenter({
    lat: location.latitude,
    lng: location.longitude,
  });

  if (isKakaoLoading) return <KakaoMapLoading visible={false} />;

  return (
    <Dialog open={visible}>
      <DialogContent className="w-screen h-screen p-0">
        <DialogTitle hidden>카카오 지도</DialogTitle>
        <DialogDescription hidden>위치를 선택하고 닫기 버튼을 눌러주세요.</DialogDescription>
        <Map
          center={currentCenter}
          style={{ width: "100%", height: "100%" }}
          level={zoomLevel}
          onCenterChanged={(map) => {
            const center = map.getCenter();
            updateCenter({ lat: center.getLat(), lng: center.getLng() });
          }}
        >
          <MyMarker latitude={location.latitude} longitude={location.longitude} />
          <KakaoPolygon />
          <MapZoomControl onZoomIn={() => adjustZoom(-1)} onZoomOut={() => adjustZoom(1)} />
          <ReturnToLocationButton onClick={returnToInitialLocation} position="BOTTOMRIGHT" />
          <div className="absolute top-4 right-4 z-50">
            <Button
              onClick={onClose}
              className="p-2 bg-white rounded-full shadow-md text-lg font-bold hover:bg-secondary-dark"
              aria-label="닫기"
              size="icon"
            >
              <X className="w-4 h-4 text-text-primary" />
            </Button>
          </div>
        </Map>
      </DialogContent>
    </Dialog>
  );
}
