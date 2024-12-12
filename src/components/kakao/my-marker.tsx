import { MapPin } from "lucide-react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface MyMarkerProps {
  latitude: number;
  longitude: number;
  role?: "ME" | "OTHER";
}

export default function MyMarker({ latitude, longitude, role = "ME" }: MyMarkerProps) {
  const bgClass = role === "ME" ? "bg-blue-200" : "bg-red-200";
  const iconColor = role === "ME" ? "#5952FF" : "#FF5252";

  return (
    <CustomOverlayMap position={{ lat: latitude, lng: longitude }}>
      <div className="relative flex items-center justify-center">
        <div className={`absolute w-16 h-16 ${bgClass} rounded-full`}></div>
        <div className="relative w-6 h-6" style={{ color: iconColor }}>
          <MapPin size={24} fill={iconColor} stroke="none" />
        </div>
      </div>
    </CustomOverlayMap>
  );
}
