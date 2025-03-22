"use client";

import { Button } from "../ui/button";
import { useRecoilValue } from "recoil";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerTitle } from "../ui/drawer";
import { MapPin } from "lucide-react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getCoordsFromAddress } from "@/utils/location/get-coords-from-address";
import { useEffect, useState } from "react";
import { MyMarker } from "../kakao";
import { locationSelector } from "@/recoil/location/selector";

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  selectedAddressName: string;
}

export default function LocationErrorDrawer({ visible, onClose, selectedAddressName }: ConfirmationModalProps) {
  const { addressName } = useRecoilValue(locationSelector);

  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (visible) {
      getCoordsFromAddress(addressName)
        .then((coords) => setCurrentCoords(coords))
        .catch((error) => console.error("Failed to fetch current location coords:", error));

      getCoordsFromAddress(selectedAddressName)
        .then((coords) => setSelectedCoords(coords))
        .catch((error) => console.error("Failed to fetch selected location coords:", error));
    }
  }, [visible, addressName, selectedAddressName]);

  if (!currentCoords || !selectedCoords) {
    return null;
  }

  return (
    <Drawer open={visible} onClose={onClose}>
      <DrawerContent className="flex flex-col">
        <div className="flex-none p-4">
          <DrawerTitle className="space-x-2 flex items-center">
            <MapPin className="w-4 h-4 text-gray-900" />
            <span className="text-sm font-medium text-gray-900">{addressName}에서</span>
          </DrawerTitle>
          <DrawerDescription className="text-xs font-medium text-gray-700 mt-2">
            {selectedAddressName}
          </DrawerDescription>
        </div>

        <div className="flex-grow relative">
          <Map center={currentCoords} style={{ width: "100%", height: "100%" }} level={5} draggable={false}>
            <MyMarker latitude={currentCoords.lat} longitude={currentCoords.lng} role="ME" />
            <MyMarker latitude={selectedCoords.lat} longitude={selectedCoords.lng} role="OTHER" />
          </Map>
        </div>
        <p className="text-sm text-gray-700 mt-4 px-4">
          선택한 장소가 현재 위치와 동일한 &apos;동&apos;에 있어야 작업을 진행할 수 있습니다.
        </p>
        <DrawerFooter className="flex-none p-4">
          <DrawerClose asChild>
            <Button onClick={onClose} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              확인
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
