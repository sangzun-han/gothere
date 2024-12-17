"use client";

import { KakaoLoginDialog } from "@/components/modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useRequireAuth() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isKakaoLoginDialogOpen, setIsKakaoLoginDialogOpen] = useState(false);

  const checkAuth = (path: string) => {
    const protectedPaths = ["/write", "/settings"];
    const nearbyDetailPattern = /^\/nearby\/[^/]+$/;

    const isProtectedPath = protectedPaths.includes(path) || nearbyDetailPattern.test(path);

    if (isProtectedPath && !session) {
      setIsKakaoLoginDialogOpen(true);
      return false;
    }

    router.push(path);
    return true;
  };

  const closeModal = () => setIsKakaoLoginDialogOpen(false);

  const LoginRequiredModal = <KakaoLoginDialog isOpen={isKakaoLoginDialogOpen} onClose={closeModal} />;

  return { checkAuth, LoginRequiredModal };
}
