"use client";

import { createContext, ReactNode } from "react";
import { KakaoMapLoading } from "@/components/kakao";
import { useKakaoLoader } from "@/hooks/kakao";

const KakaoContext = createContext<{ loading: boolean }>({
  loading: true,
});

export default function KakaoLoaderProvider({ children }: { children: ReactNode }) {
  const { loading } = useKakaoLoader();
  return <KakaoContext.Provider value={{ loading }}>{loading ? <KakaoMapLoading /> : children}</KakaoContext.Provider>;
}
