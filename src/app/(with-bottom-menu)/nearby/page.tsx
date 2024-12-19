"use client";

import { Suspense } from "react";
import LetterContent from "./_components/letter-content";
import NearbyFallback from "@/components/fallback/nearby-fallback";

export default function Page() {
  return (
    <Suspense fallback={<NearbyFallback />}>
      <main className="flex-1 min-h-0 overflow-y-auto pb-20 [&>article]:min-h-full">
        <LetterContent />
      </main>
    </Suspense>
  );
}
