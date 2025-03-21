"use client";

import { useMapCenter } from "@/hooks/location";
import { Map } from "react-kakao-maps-sdk";
import MyMarker from "./my-marker";
import KakaoPolygon from "./kakao-polygon";
import ReturnToLocationButton from "./return-to-location-button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminDistrict } from "@/utils/location/get-admin-district";
import { useRecoilValue } from "recoil";
import { locationSelector } from "@/recoil/location/selector";
import { usePolygonCoordinates } from "@/lib/api/polygon/hooks";
import { LocationSelect } from "@/types/location/location";

export default function DialogKakao({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (location: LocationSelect) => void;
}) {
  const location = useRecoilValue(locationSelector);
  const { data: polygonPaths } = usePolygonCoordinates(location.dong);

  const { currentCenter, updateCenter, returnToInitialLocation } = useMapCenter({
    lat: location.latitude,
    lng: location.longitude,
  });

  const [addressName, setAddressName] = useState(location.addressName);

  const handleCenterChange = async (lat: number, lng: number) => {
    const adminDistrict = await getAdminDistrict(lat, lng);
    setAddressName(adminDistrict.addressName);
    return adminDistrict;
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
      <DialogContent className="w-full h-full p-0">
        <DialogTitle hidden>카카오 지도</DialogTitle>
        <DialogDescription hidden>위치를 선택하고 닫기 버튼을 눌러주세요.</DialogDescription>
        <Map
          center={currentCenter}
          isPanto={true}
          style={{ width: "100%", height: "100%" }}
          level={5}
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
          <ReturnToLocationButton onClick={handleReturnToInitialLocation} position="BOTTOMLEFT" />
          <div className="fixed top-4 right-4 z-50">
            <Button
              onClick={onClose}
              className="p-2 bg-app-background hover:bg-app-background/80 rounded-full shadow-md text-lg font-bold"
              aria-label="닫기"
              size="icon"
            >
              <X className="w-4 h-4 text-gray-900" />
            </Button>
          </div>
          <div className="fixed left-1/2 transform -translate-x-1/2 bottom-5 w-11/12 z-[99] bg-app-background shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-bold text-gray-900">장소는 여기!</h2>

            <div className="flex items-center text-xs text-gray-500 mb-2">
              <div className="flex items-center">
                <span className="text-gray-700">{addressName}</span>
              </div>
            </div>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-full font-semibold text-sm"
              onClick={async () => {
                const adminDistrict = await handleCenterChange(currentCenter.lat, currentCenter.lng);
                onSelect({
                  addressName: adminDistrict.addressName,
                  latitude: currentCenter.lat,
                  longitude: currentCenter.lng,
                  si: adminDistrict.si,
                  gu: adminDistrict.gu,
                  dong: adminDistrict.dong,
                });
              }}
            >
              이 위치로 하기
            </Button>
          </div>
        </Map>
      </DialogContent>
    </Dialog>
  );
}
