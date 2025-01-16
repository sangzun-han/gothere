import { Cluster, GridData, Marker } from "@/types/cluster/cluster";
import { getGridCoordinates } from "./get-grid-coordinates";

/**
 * 마커 데이터를 클러스터링
 * @param markers 마커 데이터 배열
 * @param cellSize 셀 크기
 * @returns 클러스터링된 데이터
 */
export const clusterMarkers = (markers: Marker[], cellSize: number): Cluster[] => {
  const grid: Record<string, GridData> = {};

  markers.forEach((marker) => {
    const { x, y } = getGridCoordinates(marker.latitude, marker.longitude, cellSize);
    const key = `${x},${y}`;

    if (!grid[key]) {
      grid[key] = { count: 0, latSum: 0, lngSum: 0 };
    }

    grid[key].count += 1;
    grid[key].latSum += marker.latitude;
    grid[key].lngSum += marker.longitude;
  });

  return Object.keys(grid).map((key) => {
    const cluster = grid[key];
    return {
      lat: cluster.latSum / cluster.count,
      lng: cluster.lngSum / cluster.count,
      count: cluster.count,
    };
  });
};
