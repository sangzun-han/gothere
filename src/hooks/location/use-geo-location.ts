"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { geoLocationErrorState, geoLocationLoadingState, geoLocationState } from "@/recoil/location/atoms";
import { initializeLocation } from "@/utils/location/initialize-location";
import { useKakaoLoader } from "../kakao";

export default function useGeoLocation() {
  const [location, setLocation] = useRecoilState(geoLocationState);
  const [isLoading, setIsLoading] = useRecoilState(geoLocationLoadingState);
  const [error, setError] = useRecoilState(geoLocationErrorState);

  const { loading: isKakaoLoading } = useKakaoLoader();

  useEffect(() => {
    const fetchInitialLocation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const locationData = await initializeLocation();
        setLocation(locationData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!isKakaoLoading) {
      fetchInitialLocation();
    }
  }, [isKakaoLoading, setLocation, setIsLoading, setError]);

  return {
    location,
    error,
    isLoading: isLoading || isKakaoLoading,
  };
}
