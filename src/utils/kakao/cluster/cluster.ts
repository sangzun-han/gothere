import { GeoPost } from "@/types/posts/posts";
import { Cluster } from "@/types/coordinate/coordinate";
import { THRESHOLD_ZOOM_LEVEL, PIN_SIZE } from "@/constants/cluster";
import { getDistance } from "@/utils/distance/get-distance";

/**
 * 지오 포스트들을 유니온 파인드로 클러스터링하는 함수
 * @param map 카카오맵 인스턴스
 * @param geoPosts 지오 포스트 배열
 * @param thresholdLevel 클러스터링 임계 줌 레벨
 * @returns 클러스터 배열
 */
export const createClusters = (
  map: kakao.maps.Map,
  geoPosts: GeoPost[],
  thresholdLevel: number = THRESHOLD_ZOOM_LEVEL
): Cluster[] => {
  const projection = map.getProjection();
  const zoomLevel = map.getLevel();
  const n = geoPosts.length;

  const parents = Array.from({ length: n }, (_, i) => i);

  const find = (x: number): number => {
    if (parents[x] === x) return x;
    return (parents[x] = find(parents[x]));
  };

  const union = (a: number, b: number) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) parents[rootB] = rootA;
  };

  const points = geoPosts.map((post) => {
    const latlng = new kakao.maps.LatLng(post.latitude, post.longitude);
    return projection.containerPointFromCoords(latlng);
  });

  let markerDistance = 80; // 기본값
  if (zoomLevel > thresholdLevel) {
    const bounds = map.getBounds();
    const topLeft = new kakao.maps.LatLng(bounds.getNorthEast().getLat(), bounds.getSouthWest().getLng());
    const topRight = new kakao.maps.LatLng(bounds.getNorthEast().getLat(), bounds.getNorthEast().getLng());

    const mapWidthInMeters = getDistance(topLeft.getLat(), topLeft.getLng(), topRight.getLat(), topRight.getLng());
    const screenWidthInPixels = window.innerWidth;
    const metersPerPixel = mapWidthInMeters / screenWidthInPixels;

    const CLUSTER_SCALE_FACTOR = 0.4; // 클러스터 거리 보정 계수
    markerDistance = metersPerPixel * PIN_SIZE * CLUSTER_SCALE_FACTOR;
  }

  if (zoomLevel > thresholdLevel) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < markerDistance) {
          union(i, j);
        }
      }
    }
  }

  const clusterMap = new Map<number, Cluster>();

  for (let i = 0; i < n; i++) {
    const root = zoomLevel <= thresholdLevel ? i : find(i);
    const pt = points[i];
    const post = geoPosts[i];

    if (!clusterMap.has(root)) {
      clusterMap.set(root, { x: pt.x, y: pt.y, count: 1, posts: [post] });
    } else {
      const cluster = clusterMap.get(root)!;
      cluster.count++;
      cluster.posts.push(post);

      cluster.x = (cluster.x * (cluster.count - 1) + pt.x) / cluster.count;
      cluster.y = (cluster.y * (cluster.count - 1) + pt.y) / cluster.count;
    }
  }

  return Array.from(clusterMap.values());
};
