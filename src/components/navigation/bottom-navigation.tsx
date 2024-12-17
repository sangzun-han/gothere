"use client";

import { NAV_ITEMS } from "@/constants/nav-items";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useRequireAuth from "@/hooks/auth/use-require-auth";

export default function BottomNavigation() {
  const pathname = usePathname();
  const { checkAuth, LoginRequiredModal } = useRequireAuth();

  return (
    <>
      <nav id="bottom-navigation" className="fixed bottom-0 z-10 flex w-full flex-col items-center justify-center">
        <div className="absolute bottom-0 w-full bg-white rounded-t-2xl shadow p-2 flex items-center justify-around z-50 border-t border-secondary">
          {NAV_ITEMS.map((item) => (
            <Link
              href={item.path}
              key={item.label}
              onClick={(e) => {
                e.preventDefault();
                checkAuth(item.path);
              }}
              className={`flex flex-col items-center mb-1 ${
                pathname === item.path
                  ? "text-brand-primary font-bold"
                  : "text-text-secondary/50 hover:text-brand-primary"
              }`}
            >
              {item.icon}
              <span className="text-[11px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
      {LoginRequiredModal}
    </>
  );
}
