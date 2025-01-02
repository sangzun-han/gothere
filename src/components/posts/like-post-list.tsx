"use client";

import { useLikePostList, useMyPostList } from "@/lib/api/posts/hooks";
import { useIntersectionObserver } from "@/hooks/ui";
import { useMemo } from "react";
import { POST_LIST_PREVIOUS_PATH_KEY, POST_LIST_SCROLL_POSITION_KEY } from "@/constants/scroll-key";
import PostItem from "./post-item";
import Spinner from "@/components/spinner/spinner";
import useScrollRestoration from "@/hooks/ui/use-scroll-restoration";
import NoPost from "./no-post";

export default function LikePostList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useLikePostList(30);
  const posts = useMemo(() => data?.pages.flatMap((posts) => posts), [data]);
  const hasNoPosts = posts.every((page) => page.data.length === 0);

  const observerRef = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    enabled: hasNextPage && !isFetchingNextPage,
  });

  useScrollRestoration({
    isEnabled: Boolean(posts?.length),
    scrollKey: POST_LIST_SCROLL_POSITION_KEY,
    previousPathKey: POST_LIST_PREVIOUS_PATH_KEY,
    pathPattern: "/posts/likes",
  });

  if (hasNoPosts)
    return (
      <NoPost
        title="즐겨찾기한 게시글이 없습니다"
        description="즐겨찾기한 게시글이 존재하지 않습니다. 게시글을 즐겨찾기 해보세요!"
      />
    );

  return (
    <>
      {posts?.map((page) => page.data.map((post) => <PostItem key={post.id} post={post} />))}
      {hasNextPage && (
        <div aria-hidden ref={observerRef} className="w-full h-8 flex justify-center items-center">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </>
  );
}