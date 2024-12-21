export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  latitude: number;
  longitude: number;
  location: string;
  thumbnail_blur_image: string;
}

export interface PostsResponse {
  success: boolean;
  data: Post[] | [];
  error?: string;
}
