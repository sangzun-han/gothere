"use client";

import { KakaoMapView } from "@/components/kakao";
import BottomNavigation from "@/components/navigation/bottom-navigation";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-secondary">
      <KakaoMapView />
      <BottomNavigation />
    </div>
  );
}
