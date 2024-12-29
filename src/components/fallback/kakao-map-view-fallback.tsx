import { Map } from "react-kakao-maps-sdk";
import { MapZoomControl, MyMarker, ReturnToLocationButton } from "../kakao";
import BottomNavigation from "../navigation/bottom-navigation";

export default function KakaoMapViewFallback() {
  const fallbackCenter = { lat: 37.566826, lng: 126.9786567 };

  return (
    <Map center={fallbackCenter} style={{ width: "100%", height: "100vh" }} level={5}>
      <div className="fxied left-1/2 transform -translate-x-1/2 bottom-20 w-11/12 z-[99] bg-white shadow-lg rounded-lg p-4 text-center">
        <div className="flex items-center mb-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 mr-4" />
          <div>
            <div className="bg-gray-200 h-5 w-24 mb-2 rounded" />
            <div className="bg-gray-200 h-4 w-32 rounded" />
          </div>
        </div>

        <div className="bg-gray-200 h-4 w-1/3 mb-4 rounded" />

        <div className="bg-gray-200 h-10 w-full rounded" />
      </div>
      <MyMarker latitude={fallbackCenter.lat} longitude={fallbackCenter.lng} />
      <MapZoomControl onZoomIn={() => {}} onZoomOut={() => {}} />
      <ReturnToLocationButton onClick={() => {}} />
      <BottomNavigation />
    </Map>
  );
}
