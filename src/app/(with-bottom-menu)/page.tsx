import { KakaoMapView } from "@/components/kakao";

export default async function Page() {
  return (
    <div className="relative w-full h-screen bg-white">
      <KakaoMapView />
    </div>
  );
}
