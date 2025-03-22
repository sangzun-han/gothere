"use client";

import React, { Suspense } from "react";
import { ApiErrorBoundary } from "@/components/error/api-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import ProfileSection from "./_components/profile-section";
import ProfileSectionFallback from "@/components/fallback/profile-section-fallback";

export default function Page() {
  return (
    <article className="h-screen w-full flex flex-col">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ApiErrorBoundary onReset={reset}>
            <Suspense fallback={<ProfileSectionFallback />}>
              <ProfileSection />
            </Suspense>
          </ApiErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </article>
  );
}
