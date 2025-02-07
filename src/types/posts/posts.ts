import { Coordinate } from "../coordinate/coordinate";

export interface GeoPost {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  latitude: number;
  longitude: number;
  location: string;
  thumbnail_blur_image: string;
}

export interface GeoPostsResponse {
  success: boolean;
  data: GeoPost[] | [];
  error?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  thumbnail_blur_image: string;
  users: {
    nickname: string;
  };
  created_at: string;
}

export interface PostListResponse {
  success: boolean;
  data: Post[] | [];
  error?: string;
}

export interface SupabasePostDetail {
  title: string;
  content: string;
  location: string;
  images: string[];
  thumbnail_blur_image: string;
  created_at: string;
  latitude: number;
  longitude: number;
  users: {
    id: string;
    nickname: string;
    profile_url: string | null;
  };
  favorites?: { user_id: string }[];
}

export interface PostDetail {
  title: string;
  content: string;
  location: string;
  images: string[];
  thumbnail_blur_image: string;
  created_at: string;
  latitude: number;
  longitude: number;
  users: {
    id: string;
    nickname: string;
    profile_url: string | null;
  };
  isLiked: boolean;
}

export interface PostDetailResponse {
  success: boolean;
  data: PostDetail | null;
  error?: string;
}

export interface PostRequestPayload {
  title: string;
  content: string;
  location: string;
  city: string;
  district: string;
  dong: string;
  latitude: number;
  longitude: number;
  images: string[];
  polygonPaths: Coordinate[][] | Coordinate[];
}
