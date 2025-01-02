"use client";

import NoBottomMenuHeader from "@/components/header/no-bottom-menu-header";
import { useAuth } from "@/hooks/auth";
import { usePathname } from "next/navigation";

export default function NoBottomMenuLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const isPostDetail = pathname.startsWith("/posts/");

  if (isLoggedIn === undefined) return null;

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      {!isPostDetail && <NoBottomMenuHeader />}
      {isLoggedIn ? children : modal}
    </div>
  );
}
