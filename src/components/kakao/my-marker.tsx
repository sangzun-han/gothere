import { MapPin } from "lucide-react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface MyMarkerProps {
  latitude: number;
  longitude: number;
  role?: "ME" | "OTHER";
}

export default function MyMarker({ latitude, longitude, role = "ME" }: MyMarkerProps) {
  const bgClass = role === "ME" ? "bg-blue-100" : "bg-yellow-100";
  const iconClass = role === "ME" ? "text-blue-500" : "text-yellow-500";

  return (
    <CustomOverlayMap position={{ lat: latitude, lng: longitude }}>
      <div className="relative flex items-center justify-center">
        <div className={`absolute w-10 h-10 ${bgClass} rounded-full`}></div>
        <div className={`relative w-4 h-4 ${iconClass}`}>
          <MapPin size={16} fill="currentColor" stroke="none" />
        </div>
      </div>
    </CustomOverlayMap>
  );
}
