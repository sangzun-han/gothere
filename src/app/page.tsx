"use client";

import KakaoMapViewFallback from "@/components/fallback/kakao-map-view-fallback";
import { KakaoMapView } from "@/components/kakao";
import BottomNavigation from "@/components/navigation/bottom-navigation";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="relative w-full h-screen bg-white">
      <Suspense fallback={<KakaoMapViewFallback />}>
        <KakaoMapView />
        <BottomNavigation />
      </Suspense>
    </div>
  );
}
