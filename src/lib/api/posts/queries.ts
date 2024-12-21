import { PostsResponse } from "@/types/posts/posts";
import { getPostsByLocation } from "./get";

const queryKeys = {
  postsByLocation: (location: string) => ["posts", location] as const,
};

const queryOptions = {
  postsByLocation: (location: string) => ({
    queryKey: queryKeys.postsByLocation(location),
    queryFn: (): Promise<PostsResponse> => getPostsByLocation(location),
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  }),
};

export { queryKeys, queryOptions };
