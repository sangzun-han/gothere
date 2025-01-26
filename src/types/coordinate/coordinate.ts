import { GeoPost } from "../posts/posts";

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface PolygonData {
  coordinates: Coordinate[][];
}

export interface PolygonApiResponse {
  success: boolean;
  data: PolygonData[];
  message?: string;
}

export interface GeoPostMarker {
  x: number;
  y: number;
  post: GeoPost;
}

export interface Cluster {
  x: number;
  y: number;
  count: number;
  posts: GeoPost[];
}
