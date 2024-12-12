"use client";

import { Button } from "../ui/button";
import { useRecoilValue } from "recoil";
import { geoLocationState } from "@/recoil/location/atoms";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerTitle } from "../ui/drawer";
import { MapPin } from "lucide-react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useKakaoLoader } from "@/hooks/kakao";
import { getCoordsFromAddress } from "@/utils/location/get-coords-from-address";
import { useEffect, useState } from "react";
import { MyMarker } from "../kakao";

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  selectedAddressName: string;
}

export default function LocationErrorDrawer({ visible, onClose, selectedAddressName }: ConfirmationModalProps) {
  const { loading } = useKakaoLoader();
  const { addressName } = useRecoilValue(geoLocationState);

  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (visible && !loading) {
      getCoordsFromAddress(addressName)
        .then((coords) => setCurrentCoords(coords))
        .catch((error) => console.error("Failed to fetch current location coords:", error));

      getCoordsFromAddress(selectedAddressName)
        .then((coords) => setSelectedCoords(coords))
        .catch((error) => console.error("Failed to fetch selected location coords:", error));
    }
  }, [visible, loading, addressName, selectedAddressName]);

  if (loading || !currentCoords || !selectedCoords) {
    return null;
  }

  return (
    <Drawer open={visible} onClose={onClose}>
      <DrawerContent className="flex flex-col">
        <div className="flex-none p-4">
          <DrawerTitle hidden></DrawerTitle>
          <DrawerDescription hidden></DrawerDescription>
          <p className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-text-primary" />
            <span className="text-sm font-medium text-text-primary">{selectedAddressName}에서</span>
          </p>
          <span className="text-xs font-medium text-text-secondary">{addressName}</span>
        </div>

        <div className="flex-grow relative">
          <Map center={currentCoords} style={{ width: "100%", height: "100%" }} level={5} draggable={false}>
            <MyMarker latitude={currentCoords.lat} longitude={currentCoords.lng} role="ME" />
            <MyMarker latitude={selectedCoords.lat} longitude={selectedCoords.lng} role="OTHER" />
          </Map>
        </div>
        <p className="text-sm text-text-secondary mt-4 px-4">
          선택한 장소가 현재 위치와 동일한 &apos;동&apos;에 있어야 작업을 진행할 수 있습니다.
        </p>
        <DrawerFooter className="flex-none p-4">
          <DrawerClose asChild>
            <Button onClick={onClose} className="w-full bg-brand-primary hover:bg-brand-hover text-white">
              확인
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
