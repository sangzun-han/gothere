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
