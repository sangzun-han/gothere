import BottomNavigation from "@/components/navigation/bottom-navigation";

export default function WithBottomMenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col h-screen bg-app-background">
      {children}
      <BottomNavigation />
    </div>
  );
}
