"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ScrollRestorationOptions {
  /** 스크롤 위치 저장 기능 활성화 여부 */
  isEnabled: boolean;
  /** 스크롤 위치값을 저장할 sessionStorage 키
   * @example "post-list-scroll" */
  scrollKey: string;
  /** 이전 페이지 경로를 저장할 sessionStorage 키
   * @example "post-list-previous-path" */
  previousPathKey: string;
  /** 스크롤 위치를 복원할 페이지의 경로 패턴
   * @example "/posts/" or "/nearby/" */
  pathPattern: string;
}

/**
 * 페이지 간 스크롤 위치를 저장하고 복원하는 hook
 * 목록 페이지에서 상세 페이지로 이동 후
 * 다시 돌아올 때 스크롤 위치를 복원하는데 사용
 */
export default function useScrollRestoration({
  isEnabled,
  scrollKey,
  previousPathKey,
  pathPattern,
}: ScrollRestorationOptions) {
  const currentPath = usePathname();

  useEffect(() => {
    const saveCurrentPath = () => {
      sessionStorage.setItem(previousPathKey, currentPath);
    };
    window.addEventListener("beforeunload", saveCurrentPath);
    return () => window.removeEventListener("beforeunload", saveCurrentPath);
  }, [currentPath, previousPathKey]);

  useEffect(() => {
    if (!isEnabled) return;

    const saveScrollPosition = () => {
      sessionStorage.setItem(scrollKey, window.scrollY.toString());
    };

    let debounceTimer: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(saveScrollPosition, 100);
    };

    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      clearTimeout(debounceTimer);
    };
  }, [isEnabled, scrollKey]);

  useEffect(() => {
    if (!isEnabled) return;

    const prevPath = sessionStorage.getItem(previousPathKey);
    const savedPosition = sessionStorage.getItem(scrollKey);

    if (prevPath && savedPosition && prevPath.includes(pathPattern)) {
      window.scrollTo({
        top: parseInt(savedPosition),
      });

      sessionStorage.removeItem(previousPathKey);
      sessionStorage.removeItem(scrollKey);
    }
  }, [isEnabled, previousPathKey, scrollKey, pathPattern]);
}
