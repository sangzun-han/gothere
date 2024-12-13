import { Map } from "react-kakao-maps-sdk";
import { MapZoomControl, MarkerInfoModal, MyMarker, ReturnToLocationButton } from "../kakao";
import BottomNavigation from "../navigation/bottom-navigation";

export default function KakaoMapViewFallback() {
  const fallbackCenter = { lat: 37.566826, lng: 126.9786567 };

  return (
    <Map center={fallbackCenter} style={{ width: "100%", height: "100vh" }} level={5}>
      <MarkerInfoModal addressName="위치 정보를 불러오는 중입니다..." />
      <MyMarker latitude={fallbackCenter.lat} longitude={fallbackCenter.lng} />
      <MapZoomControl onZoomIn={() => {}} onZoomOut={() => {}} />
      <ReturnToLocationButton onClick={() => {}} />
      <BottomNavigation />
    </Map>
  );
}
