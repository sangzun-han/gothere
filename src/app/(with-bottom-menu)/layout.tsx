import BottomNavigation from "@/components/navigation/bottom-navigation";

export default function WithBottomMenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      {children}
      <BottomNavigation />
    </div>
  );
}
