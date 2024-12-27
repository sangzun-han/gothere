import { GeoPostsResponse, PostDetailResponse, PostListResponse } from "@/types/posts/posts";
import { getPostDetail, getPostListByLocation, getPostsByLocation } from "./get";

const queryKeys = {
  PostsByLocation: (si: string, gu: string, dong: string) => ["posts", si, gu, dong] as const,
  PostListByLocation: (location: string) => ["postList", location] as const,
  PostDetailById: (id: string) => ["postDetail", id] as const,
};

const queryOptions = {
  PostsByLocation: (si: string, gu: string, dong: string) => ({
    queryKey: queryKeys.PostsByLocation(si, gu, dong),
    queryFn: (): Promise<GeoPostsResponse> => getPostsByLocation(si, gu, dong),
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  }),

  PostListByLocation: (location: string, limit: number = 30) => ({
    queryKey: queryKeys.PostListByLocation(location),
    queryFn: ({ pageParam = 1 }) => getPostListByLocation(location, pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PostListResponse, allPages: PostListResponse[]) => {
      if (lastPage.data.length < limit) {
        return undefined;
      }
      return allPages.length + 1;
    },
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
