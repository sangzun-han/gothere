"use client";

import { useMyPostList } from "@/lib/api/posts/hooks";
import { useIntersectionObserver } from "@/hooks/ui";
import { useMemo } from "react";
import { POST_LIST_PREVIOUS_PATH_KEY, POST_LIST_SCROLL_POSITION_KEY } from "@/constants/scroll-key";
import PostItem from "./post-item";
import Spinner from "@/components/spinner/spinner";
import useScrollRestoration from "@/hooks/ui/use-scroll-restoration";

export default function MyPostList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyPostList(30);
  const posts = useMemo(() => data?.pages.flatMap((posts) => posts), [data]);

  const observerRef = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    enabled: hasNextPage && !isFetchingNextPage,
  });

  useScrollRestoration({
    isEnabled: Boolean(posts?.length),
    scrollKey: POST_LIST_SCROLL_POSITION_KEY,
    previousPathKey: POST_LIST_PREVIOUS_PATH_KEY,
    pathPattern: "/posts/my",
  });

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
