"use client";

import { NAV_ITEMS } from "@/constants/nav-items";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="absolute bottom-0 w-full bg-white rounded-t-2xl shadow p-2 flex items-center justify-around z-50">
      {NAV_ITEMS.map((item) => (
        <Link
          href={item.path}
          key={item.label}
          className={`flex flex-col items-center mb-1 ${
            pathname === item.path ? "text-primary font-bold" : "text-text-secondary/50 hover:text-primary"
          }`}
        >
          {item.icon}
          <span className="text-[11px]">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
