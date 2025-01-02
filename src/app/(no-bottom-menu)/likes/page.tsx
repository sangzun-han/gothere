"use client";

import { ApiErrorBoundary } from "@/components/error/api-error-boundary";
import PostsFallback from "@/components/fallback/posts-fallback";
import LikePostList from "@/components/posts/like-post-list";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="flex-1 min-h-0 overflow-y-auto pb-20 [&>article]:min-h-full">
      <article className="bg-white p-4 min-h-screen">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ApiErrorBoundary onReset={reset}>
              <Suspense fallback={<PostsFallback />}>
                <LikePostList />
              </Suspense>
            </ApiErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </article>
    </main>
  );
}
