"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import { KakaoPolygon, MapZoomControl, ReturnToLocationButton } from "@/components/kakao";
import { useGeoLocation, useMapCenter } from "@/hooks/location";
import { useMapZoom } from "@/hooks/kakao";
import KakaoMapLoading from "./kakao-map-loading";

export default function KakaoMapView() {
  const { location, isLoading } = useGeoLocation();
  const { zoomLevel, adjustZoom } = useMapZoom();
  const { currentCenter, updateCenter, returnToInitialLocation } = useMapCenter({
    lat: location.latitude,
    lng: location.longitude,
  });

  const handleCenterChanged = (map: kakao.maps.Map) => {
    const center = map.getCenter();
    updateCenter({ lat: center.getLat(), lng: center.getLng() });
  };

  if (isLoading) return <KakaoMapLoading />;

  return (
    <Map
      center={currentCenter}
      style={{ width: "100%", height: "100vh" }}
      level={zoomLevel}
      onCenterChanged={handleCenterChanged}
    >
      <MapMarker position={{ lat: location.latitude, lng: location.longitude }} />
      <KakaoPolygon />
      <MapZoomControl onZoomIn={() => adjustZoom(-1)} onZoomOut={() => adjustZoom(1)} />
      <ReturnToLocationButton onClick={returnToInitialLocation} />
    </Map>
  );
}
