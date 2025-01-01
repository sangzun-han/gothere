import { GeoPostsResponse, PostDetailResponse, PostListResponse } from "@/types/posts/posts";
import { getPostDetail, getPostListByLocation, getPostsByLocation } from "./get";
import { updateLike } from "./update";

const queryKeys = {
  PostsByLocation: (si: string, gu: string, dong: string) => ["posts", si, gu, dong] as const,
  PostListByLocation: (si: string, gu: string, dong: string) => ["postList", location] as const,
  PostDetailById: (id: string) => ["postDetail", id] as const,
};

const queryOptions = {
  PostsByLocation: (si: string, gu: string, dong: string) => ({
    queryKey: queryKeys.PostsByLocation(si, gu, dong),
    queryFn: (): Promise<GeoPostsResponse> => getPostsByLocation(si, gu, dong),
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  }),

  PostListByLocation: (si: string, gu: string, dong: string, limit: number = 30) => ({
    queryKey: queryKeys.PostListByLocation(si, gu, dong),
    queryFn: ({ pageParam = 1 }) => getPostListByLocation(si, gu, dong, pageParam, limit),
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

const mutationKeys = {
  UpdateLike: (postId: string) => ["updateLike", postId] as const,
};

const mutationOptions = {
  UpdateLike: (postId: string) => ({
    mutationKey: mutationKeys.UpdateLike(postId),
    mutationFn: (): Promise<{ isLiked: boolean }> => updateLike(postId),
  }),
};

export { queryKeys, queryOptions, mutationKeys, mutationOptions };
