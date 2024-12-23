import { GeoPostsResponse, PostDetailResponse, PostListResponse } from "@/types/posts/posts";
import { getPostDetail, getPostListByLocation, getPostsByLocation } from "./get";

const queryKeys = {
  PostsByLocation: (location: string) => ["posts", location] as const,
  PostListByLocation: (location: string, page: number, limit: number) => ["postList", location, page, limit] as const,
  PostDetailById: (id: string) => ["postDetail", id] as const,
};

const queryOptions = {
  PostsByLocation: (location: string) => ({
    queryKey: queryKeys.PostsByLocation(location),
    queryFn: (): Promise<GeoPostsResponse> => getPostsByLocation(location),
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  }),

  PostListByLocation: (location: string, page: number, limit: number) => ({
    queryKey: queryKeys.PostListByLocation(location, page, limit),
    queryFn: (): Promise<PostListResponse> => getPostListByLocation(location, page, limit),
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  }),

  PostDetailById: (id: string) => ({
    queryKey: queryKeys.PostDetailById(id),
    queryFn: (): Promise<PostDetailResponse> => getPostDetail(id),
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  }),
};

export { queryKeys, queryOptions };
