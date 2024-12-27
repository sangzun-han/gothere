import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "./queries";
import { GeoPostsResponse, PostDetailResponse, PostListResponse } from "@/types/posts/posts";

export function usePostsBytLocation(si: string, gu: string, dong: string) {
  return useSuspenseQuery<GeoPostsResponse>(queryOptions.PostsByLocation(si, gu, dong));
}

export function usePostListByLocation(location: string, limit: number) {
  return useSuspenseInfiniteQuery(queryOptions.PostListByLocation(location, limit));
}

export function usePostDetailById(id: string) {
  return useSuspenseQuery<PostDetailResponse>(queryOptions.PostDetailById(id));
}
