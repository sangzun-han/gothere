"use client";

import { Map } from "react-kakao-maps-sdk";
import {
  KakaoPolygon,
  MapZoomControl,
  ReturnToLocationButton,
  UserMarker,
  MyMarker,
  MarkerInfoModal,
} from "@/components/kakao";
import { useMapCenter } from "@/hooks/location";
import { useMapZoom } from "@/hooks/kakao";
import { locationSelector } from "@/recoil/location/selector";
import { useRecoilValue } from "recoil";

export default function KakaoMapView() {
  const location = useRecoilValue(locationSelector);
  const { zoomLevel, adjustZoom } = useMapZoom();
  const { currentCenter, updateCenter, returnToInitialLocation } = useMapCenter({
    lat: location.latitude,
    lng: location.longitude,
  });

  const handleCenterChanged = (map: kakao.maps.Map) => {
    const center = map.getCenter();
    updateCenter({ lat: center.getLat(), lng: center.getLng() });
  };

  return (
    <Map
      center={currentCenter}
      style={{ width: "100%", height: "100vh" }}
      level={zoomLevel}
      onCenterChanged={handleCenterChanged}
    >
      <MyMarker latitude={location.latitude} longitude={location.longitude} />
      <UserMarker />
      <MarkerInfoModal addressName={location.addressName} />
      <KakaoPolygon />
      <MapZoomControl onZoomIn={() => adjustZoom(-1)} onZoomOut={() => adjustZoom(1)} />
      <ReturnToLocationButton onClick={returnToInitialLocation} />
    </Map>
  );
}
