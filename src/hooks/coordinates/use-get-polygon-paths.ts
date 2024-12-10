import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { geoLocationState } from "@/recoil/location/atoms";
import { getPolygonCoordinates } from "@/utils/coordinates/get-polygon-coordinates";

export default function useGetPolygonPaths() {
  const { dong } = useRecoilValue(geoLocationState);
  const [polygonPaths, setPolygonPaths] = useState<{ lat: number; lng: number }[][]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolygonPaths = async () => {
      if (!dong) return;

      try {
        const paths = await getPolygonCoordinates(dong);
        setPolygonPaths(paths);
      } catch (error) {
        setError("폴리곤 좌표를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchPolygonPaths();
  }, [dong]);

  return { polygonPaths };
}
