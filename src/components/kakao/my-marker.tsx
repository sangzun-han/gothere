import { MapPin } from "lucide-react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface MyMarkerProps {
  latitude: number;
  longitude: number;
}

export default function MyMarker({ latitude, longitude }: MyMarkerProps) {
  return (
    <CustomOverlayMap position={{ lat: latitude, lng: longitude }}>
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 bg-secondary bg-opacity-50 rounded-full"></div>
        <div className="relative w-6 h-6 text-[#5952FF]">
          <MapPin size={24} fill="#5952FF" stroke="none" className="rotate-45" />
        </div>
      </div>
    </CustomOverlayMap>
  );
}
