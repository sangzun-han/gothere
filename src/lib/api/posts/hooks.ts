import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "./queries";
import { PostsResponse } from "@/types/posts/posts";

export function usePostsBytLocation(location: string) {
  return useSuspenseQuery<PostsResponse>(queryOptions.postsByLocation(location));
}
