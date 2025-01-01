"use client";

import { Suspense } from "react";
import { ApiErrorBoundary } from "@/components/error/api-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import PostDetail from "../../../../components/posts/post-detail";
import PostDetailFallback from "@/components/fallback/post-detail-fallback";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ApiErrorBoundary onReset={reset}>
          <Suspense fallback={<PostDetailFallback />}>
            <PostDetail uuid={id} />
          </Suspense>
        </ApiErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
