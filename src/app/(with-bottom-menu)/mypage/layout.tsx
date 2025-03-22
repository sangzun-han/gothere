"use client";

import { useAuth } from "@/hooks/auth";

export default function MyPageLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn === undefined) return null;

  return <main className="w-full flex flex-col">{isLoggedIn ? children : modal}</main>;
}
