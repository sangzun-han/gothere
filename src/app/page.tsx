"use client";

import { KakaoMapView } from "@/components/kakao";
import BottomNavigation from "@/components/navigation/bottom-navigation";

export default function Page() {
  return (
    <div className="relative w-full h-screen bg-white">
      <KakaoMapView />
      <BottomNavigation />
    </div>
  );
}
