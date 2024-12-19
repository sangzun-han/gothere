"use client";

import NoBottomMenuHeader from "@/components/header/no-bottom-menu-header";
import { useAuth } from "@/hooks/auth";

export default function NoBottomMenuLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const { isLoggedIn } = useAuth();

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <NoBottomMenuHeader />
      {isLoggedIn && children}
      {!isLoggedIn && modal}
    </div>
  );
}
