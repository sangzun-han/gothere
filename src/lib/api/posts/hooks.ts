import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "./queries";
import { GeoPostsResponse, PostListResponse } from "@/types/posts/posts";

export function usePostsBytLocation(location: string) {
  return useSuspenseQuery<GeoPostsResponse>(queryOptions.PostsByLocation(location));
}

export function usePostListByLocation(location: string, page: number, limit: number) {
  return useSuspenseQuery<PostListResponse>(queryOptions.PostListByLocation(location, page, limit));
}

export function usePostDetailById(id: string) {
  return useSuspenseQuery(queryOptions.PostDetailById(id));
}
