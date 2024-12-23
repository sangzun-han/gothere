"use client";

import KakaoMapViewFallback from "@/components/fallback/kakao-map-view-fallback";
import { KakaoMapView } from "@/components/kakao";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="relative w-full h-screen bg-white">
      <Suspense fallback={<KakaoMapViewFallback />}>
        <KakaoMapView />
      </Suspense>
    </div>
  );
}
