export interface Marker {
  latitude: number;
  longitude: number;
}

export interface Cluster {
  lat: number; // 클러스터 중심 위도
  lng: number; // 클러스터 중심 경도
  count: number; // 클러스터 내 마커 수
}

export interface GridData {
  count: number; // 그리드 내 마커 수
  latSum: number; // 그리드 내 마커 위도 합
  lngSum: number; // 그리드 내 마커 경도 합
}
