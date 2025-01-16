"use client";

import { Cluster, Marker } from "@/types/cluster/cluster";
import { calculateCellSize } from "@/utils/cluster/calculate-cell-size";
import { clusterMarkers } from "@/utils/cluster/cluster-markers";
import { useEffect, useState } from "react";

export const useClusterMarkers = (markers: Marker[], zoomLevel: number): Cluster[] => {
  const [clusters, setClusters] = useState<Cluster[]>([]);

  useEffect(() => {
    const cellSize = calculateCellSize(zoomLevel);
    const clusteredMarkers = clusterMarkers(markers, cellSize); // 클러스터링
    setClusters(clusteredMarkers);
  }, [markers, zoomLevel]);
  return clusters;
};
