import { useState, useEffect, useCallback } from "react";

interface LatLng {
  lat: number;
  lng: number;
}

/**
 * 지도의 중심점을 관리하는 커스텀 훅
 *
 * @param initialLocation - 지도의 초기 중심 좌표
 * @returns 현재 중심점, 중심점 업데이트 함수, 초기 위치로 돌아가는 함수
 */

export default function useMapCenter(initialLocation: LatLng) {
  const [currentCenter, setCurrentCenter] = useState<LatLng>(initialLocation);

  const updateCenter = useCallback((newCenter: LatLng) => {
    setCurrentCenter((prev) => (prev.lat !== newCenter.lat || prev.lng !== newCenter.lng ? newCenter : prev));
  }, []);

  const returnToInitialLocation = useCallback(() => {
    setCurrentCenter(initialLocation);
  }, [initialLocation]);

  useEffect(() => {
    setCurrentCenter({
      lat: initialLocation.lat,
      lng: initialLocation.lng,
    });
  }, [initialLocation.lat, initialLocation.lng]);

  return {
    currentCenter,
    updateCenter,
    returnToInitialLocation,
  };
}
