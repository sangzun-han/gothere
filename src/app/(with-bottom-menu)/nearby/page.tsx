"use client";

import { useRecoilValue } from "recoil";
import { locationSelector } from "@/recoil/location/selector";
import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ApiErrorBoundary } from "@/components/error/api-error-boundary";
import PostList from "./_components/post-list";
import NearbyFallback from "@/components/fallback/nearby-fallback";

export default function Page() {
  const location = useRecoilValue(locationSelector);

  return (
    <main className="flex-1 min-h-0 overflow-y-auto pb-20 [&>article]:min-h-full">
      <article className="bg-white p-4 min-h-screen">
        <header>
          <h1 className="text-base font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">
            📮 {location.addressName}
          </h1>
        </header>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ApiErrorBoundary onReset={reset}>
              <Suspense fallback={<NearbyFallback />}>
                <PostList dong={location.dong} />
              </Suspense>
            </ApiErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </article>
    </main>
  );
}
