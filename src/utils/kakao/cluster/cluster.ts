import { GeoPost } from "@/types/posts/posts";
import { Cluster } from "@/types/coordinate/coordinate";
import { THRESHOLD_ZOOM_LEVEL } from "@/constants/cluster";

/**
 * 지오 포스트들을 클러스터로 그룹화하는 함수
 * @param map 카카오맵 인스턴스
 * @param geoPosts 지오 포스트 배열
 * @param thresholdLevel 클러스터링 임계 줌 레벨
 * @param baseGridSize 클러스터 그리드 크기
 * @returns 클러스터 배열
 */
export const createClusters = (
  map: kakao.maps.Map,
  geoPosts: GeoPost[],
  thresholdLevel: number = THRESHOLD_ZOOM_LEVEL,
  baseGridSize: number = 100
): Cluster[] => {
  const projection = map.getProjection();
  const clusterMap = new Map<string, Cluster>();
  const zoomLevel = map.getLevel();

  geoPosts.forEach((post) => {
    const latlng = new kakao.maps.LatLng(post.latitude, post.longitude);
    const point = projection.containerPointFromCoords(latlng);

    // 특정 줌 레벨 이하에서는 '그냥 개별 포인트'로 처리
    if (zoomLevel <= thresholdLevel) {
      clusterMap.set(post.id, { x: point.x, y: point.y, count: 1, posts: [post] });
      return;
    }

    // 이미 존재하는 클러스터 중, 현재 포인트와 가까운 것이 있다면 합친다
    let foundCluster = false;
    for (const cluster of Array.from(clusterMap.values())) {
      const dx = cluster.x - point.x;
      const dy = cluster.y - point.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < baseGridSize) {
        cluster.posts.push(post);
        cluster.count += 1;
        foundCluster = true;
        break;
      }
    }

    if (!foundCluster) {
      clusterMap.set(post.id, { x: point.x, y: point.y, count: 1, posts: [post] });
    }
  });

  return Array.from(clusterMap.values());
};
