import BottomNavigation from "@/components/navigation/bottom-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen">
      <main className="flex-1 min-h-0 overflow-y-auto pb-20 [&>article]:min-h-full">{children}</main>
      <BottomNavigation />
    </div>
  );
}
