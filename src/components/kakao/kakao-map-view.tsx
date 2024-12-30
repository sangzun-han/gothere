"use client";

import { Map } from "react-kakao-maps-sdk";
import { KakaoPolygon, ReturnToLocationButton, MyMarker, PostMarkers, PostsCarousel } from "@/components/kakao";
import { useMapCenter } from "@/hooks/location";
import { locationSelector } from "@/recoil/location/selector";
import { useRecoilValue } from "recoil";
import { usePostsBytLocation } from "@/lib/api/posts/hooks";
import { usePolygonCoordinates } from "@/lib/api/polygon/hooks";
import { useState } from "react";

export default function KakaoMapView() {
  const location = useRecoilValue(locationSelector);
  const { si, gu, dong } = location;
  const { currentCenter, updateCenter, returnToInitialLocation } = useMapCenter({
    lat: location.latitude,
    lng: location.longitude,
  });

  const [selectedPostIndex, setSelectedPostIndex] = useState(0);

  const handlePostClick = (index: number) => {
    setSelectedPostIndex(index);
  };

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
      onCenterChanged={handleCenterChanged}
    >
      <MyMarker latitude={location.latitude} longitude={location.longitude} />
      <PostMarkers geoPosts={geoPosts.data} onPostClick={handlePostClick} />
      <PostsCarousel geoPosts={geoPosts?.data} dong={location.dong} selectedPostIndex={selectedPostIndex} />
      <KakaoPolygon polygonPaths={polygonPaths} />
      <ReturnToLocationButton onClick={returnToInitialLocation} />
    </Map>
  );
}
