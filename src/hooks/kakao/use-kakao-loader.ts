"use client";

import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
  const [loading, error] = useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY as string,
    libraries: ["clusterer", "drawing", "services"],
  });

  return { loading, error };
}
