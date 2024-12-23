"use client";

import React, { Suspense } from "react";
import ProfileHeader from "./_components/profile-header";
import ProfileSection from "./_components/profile-section";
import { ApiErrorBoundary } from "@/components/error/api-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import ProfileSectionFallback from "@/components/fallback/profile-section-fallback";

export default function Page() {
  return (
    <main className="h-screen w-full flex flex-col bg-white">
      <ProfileHeader />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ApiErrorBoundary onReset={reset}>
            <Suspense fallback={<ProfileSectionFallback />}>
              <ProfileSection />
            </Suspense>
          </ApiErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </main>
  );
}
