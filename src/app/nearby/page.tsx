"use client";

import { Suspense } from "react";
import LetterContent from "./_components/letter-content";
import NearbyFallback from "@/components/fallback/nearby-fallback";

export default function Page() {
  return (
    <Suspense fallback={<NearbyFallback />}>
      <LetterContent />
    </Suspense>
  );
}
