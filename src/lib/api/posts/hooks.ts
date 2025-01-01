import { useMutation, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { mutationKeys, mutationOptions, queryOptions } from "./queries";
import { GeoPostsResponse, PostDetailResponse } from "@/types/posts/posts";

export function usePostsBytLocation(si: string, gu: string, dong: string) {
  return useSuspenseQuery<GeoPostsResponse>(queryOptions.PostsByLocation(si, gu, dong));
}

export function usePostListByLocation(si: string, gu: string, dong: string, limit: number) {
  return useSuspenseInfiniteQuery(queryOptions.PostListByLocation(si, gu, dong, limit));
}

export function usePostDetailById(id: string) {
  return useSuspenseQuery<PostDetailResponse>(queryOptions.PostDetailById(id));
}

export function useUpdateLike(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    ...mutationOptions.UpdateLike(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: mutationKeys.UpdateLike(postId) });
      const previousPostDetail = queryClient.getQueryData(["postDetail", postId]);
      queryClient.setQueryData(["postDetail", postId], (old: PostDetailResponse) => {
        if (!old || !old.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            isLiked: !old.data.isLiked,
          },
        };
      });
      return { previousPostDetail };
    },

    onError: (err, _, context) => {
      if (context?.previousPostDetail) {
        queryClient.setQueryData(["postDetail", postId], context.previousPostDetail);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["postDetail", postId] });
    },
  });
}
