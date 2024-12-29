"use client";

import KakaoMapViewFallback from "@/components/fallback/kakao-map-view-fallback";
import { KakaoMapView } from "@/components/kakao";
import { Suspense, useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-white">
      <Suspense fallback={<KakaoMapViewFallback />}>
        <KakaoMapView />
      </Suspense>
    </div>
  );
}
