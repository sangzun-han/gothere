import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "./queries";
import { GeoPostsResponse, PostDetailResponse, PostListResponse } from "@/types/posts/posts";

export function usePostsBytLocation(location: string) {
  return useSuspenseQuery<GeoPostsResponse>(queryOptions.PostsByLocation(location));
}

export function usePostListByLocation(location: string, limit: number) {
  return useSuspenseInfiniteQuery(queryOptions.PostListByLocation(location, limit));
}

export function usePostDetailById(id: string) {
  return useSuspenseQuery<PostDetailResponse>(queryOptions.PostDetailById(id));
}
