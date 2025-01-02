import { useMutation, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { mutationKeys, mutationOptions, queryKeys, queryOptions } from "./queries";
import { GeoPostsResponse, PostDetailResponse } from "@/types/posts/posts";
import { deletePost } from "./delete";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function usePostsBytLocation(si: string, gu: string, dong: string) {
  return useSuspenseQuery<GeoPostsResponse>(queryOptions.PostsByLocation(si, gu, dong));
}

export function usePostListByLocation(si: string, gu: string, dong: string, limit: number) {
  return useSuspenseInfiniteQuery(queryOptions.PostListByLocation(si, gu, dong, limit));
}

export function usePostDetailById(id: string) {
  return useSuspenseQuery<PostDetailResponse>(queryOptions.PostDetailById(id));
}

export function useMyPostList(limit: number) {
  return useSuspenseInfiniteQuery(queryOptions.MyPost(limit));
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

export function useLikePostList(limit: number) {
  return useSuspenseInfiniteQuery(queryOptions.LikePostList(limit));
}

export function useDeletePost(postId: string) {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      toast({
        title: "게시글 삭제 완료",
        description: "게시글이 성공적으로 삭제되었습니다.",
        duration: 1000,
      });
      queryClient.removeQueries({ queryKey: ["posts"] });
      queryClient.removeQueries({ queryKey: ["postList"] });
      queryClient.removeQueries({ queryKey: ["myPost"] });
      queryClient.removeQueries({ queryKey: ["likePosts"] });

      queryClient.removeQueries({
        queryKey: queryKeys.PostDetailById(postId),
      });

      router.back();
    },
    onError: (error: unknown) => {
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as Record<string, any>).message === "string"
          ? (error as Record<string, any>).message
          : "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";

      toast({
        title: "게시글 삭제 실패",
        description: errorMessage,
        variant: "destructive",
        duration: 1000,
      });
    },
  });
}
