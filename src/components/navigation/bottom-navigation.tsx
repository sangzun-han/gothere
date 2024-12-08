import { NAV_ITEMS } from "@/constants/nav-items";
import Link from "next/link";

const BottomNavigation = () => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-11/12 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-around z-50">
      {NAV_ITEMS.map((item, index) => (
        <Link href={item.path} className="flex flex-col items-center text-gray-600 hover:text-black" key={item.label}>
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
