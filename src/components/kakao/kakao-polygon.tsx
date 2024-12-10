import { Polygon } from "react-kakao-maps-sdk";
import { useGetPolygonPaths } from "@/hooks/coordinates";

export default function KakaoPolygon() {
  const { polygonPaths } = useGetPolygonPaths();

  return (
    <>
      {polygonPaths.length > 0 &&
        polygonPaths.map((path, index) => (
          <Polygon
            key={index}
            path={path} // 각 폴리곤 경로를 개별적으로 전달
            strokeWeight={3} // 선 두께
            strokeColor="#8093f1" // 선 색상
            strokeOpacity={0.8} // 선 투명도
            fillColor="#8093f1" // 채우기 색상
            fillOpacity={0.5} // 채우기 투명도
          />
        ))}
    </>
  );
}
