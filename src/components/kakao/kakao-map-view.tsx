"use client";

import { Map } from "react-kakao-maps-sdk";
import { KakaoPolygon, ReturnToLocationButton, MyMarker } from "@/components/kakao";
import { useMapCenter } from "@/hooks/location";
import { locationSelector } from "@/recoil/location/selector";
import { useRecoilValue } from "recoil";
import { usePostsBytLocation } from "@/lib/api/posts/hooks";
import { usePolygonCoordinates } from "@/lib/api/polygon/hooks";
import { useState } from "react";
import PostMarkersCanvas from "./post-markers-canvas";
import NoPostMeesage from "./no-post-meesage";

export default function KakaoMapView() {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const location = useRecoilValue(locationSelector);
  const { si, gu, dong } = location;
  const { currentCenter, updateCenter, returnToInitialLocation, isReturning } = useMapCenter({
    lat: location.latitude,
    lng: location.longitude,
  });

  const handleCenterChanged = (map: kakao.maps.Map) => {
    const center = map.getCenter();
    updateCenter({ lat: center.getLat(), lng: center.getLng() });
  };

  const { data: geoPosts } = usePostsBytLocation(si, gu, dong);
  const { data: polygonPaths } = usePolygonCoordinates(dong);

  return (
    <Map
      center={currentCenter}
      isPanto={true}
      style={{ width: "100%", height: "100vh" }}
      level={5}
      onCreate={setMap}
      onCenterChanged={handleCenterChanged}
    >
      {map && <PostMarkersCanvas map={map} geoPosts={geoPosts?.data ?? []} isReturning={isReturning} />}
      {(!geoPosts || geoPosts.data?.length === 0) && <NoPostMeesage dong={dong} />}
      <MyMarker latitude={location.latitude} longitude={location.longitude} />
      <KakaoPolygon polygonPaths={polygonPaths} />
      <ReturnToLocationButton onClick={returnToInitialLocation} />
    </Map>
  );
}
