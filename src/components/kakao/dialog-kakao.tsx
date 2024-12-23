"use client";

import { useMapZoom } from "@/hooks/kakao";
import { useMapCenter } from "@/hooks/location";
import { Map } from "react-kakao-maps-sdk";
import MyMarker from "./my-marker";
import KakaoPolygon from "./kakao-polygon";
import MapZoomControl from "./map-zoom-control";
import ReturnToLocationButton from "./return-to-location-button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminDistrict } from "@/utils/location/get-admin-district";
import { useRecoilValue } from "recoil";
import { locationSelector } from "@/recoil/location/selector";
import { usePolygonCoordinates } from "@/lib/api/polygon/hooks";

export default function DialogKakao({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (location: { addressName: string; latitude: number; longitude: number }) => void;
}) {
  const location = useRecoilValue(locationSelector);
  const { data: polygonPaths } = usePolygonCoordinates(location.dong);

  const { zoomLevel, adjustZoom } = useMapZoom();
  const { currentCenter, updateCenter, returnToInitialLocation } = useMapCenter({
    lat: location.latitude,
    lng: location.longitude,
  });

  const [addressName, setAddressName] = useState(location.addressName);

  const handleCenterChange = async (lat: number, lng: number) => {
    const adminDistrict = await getAdminDistrict(lat, lng);
    setAddressName(adminDistrict.addressName);
  };

  const handleReturnToInitialLocation = () => {
    returnToInitialLocation();
    setAddressName(location.addressName);
  };

  useEffect(() => {
    setAddressName(location.addressName);
  }, [location.addressName]);

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
            const newLat = center.getLat();
            const newLng = center.getLng();

            updateCenter({ lat: newLat, lng: newLng });
            handleCenterChange(newLat, newLng);
          }}
        >
          <MyMarker latitude={currentCenter.lat} longitude={currentCenter.lng} />
          <KakaoPolygon polygonPaths={polygonPaths} />
          <MapZoomControl onZoomIn={() => adjustZoom(-1)} onZoomOut={() => adjustZoom(1)} />
          <ReturnToLocationButton onClick={handleReturnToInitialLocation} position="BOTTOMLEFT" />
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
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 bg-white shadow-lg rounded-lg p-4 w-11/12 z-[999]">
            <h2 className="text-lg font-bold text-text-primary">장소는 여기!</h2>

            <div className="flex items-center text-xs text-gray-500 mb-2">
              <div className="flex items-center">
                <span className="text-text-primary/70">{addressName}</span>
              </div>
            </div>
            <Button
              className="bg-brand-primary hover:bg-brand-hover text-white p-2 rounded-lg w-full font-semibold text-sm"
              onClick={() =>
                onSelect({
                  addressName,
                  latitude: currentCenter.lat,
                  longitude: currentCenter.lng,
                })
              }
            >
              이 위치로 하기
            </Button>
          </div>
        </Map>
      </DialogContent>
    </Dialog>
  );
}
