"use client";

import { usePostListByLocation } from "@/lib/api/posts/hooks";
import { useIntersectionObserver } from "@/hooks/intersection-observer";
import PostItem from "./post-item";
import Spinner from "@/components/spinner/spinner";

export default function PostList({ dong }: { dong: string }) {
  const { data: postList, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostListByLocation(dong, 30);

  const observerRef = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    enabled: hasNextPage && !isFetchingNextPage,
  });

  return (
    <>
      {postList?.pages?.map((page) => page.data.map((post) => <PostItem key={post.id} post={post} />))}
      {hasNextPage && (
        <div ref={observerRef} className="w-full h-8 flex justify-center items-center">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </>
  );
}
