import { MapPin, Edit, List, Settings } from "lucide-react";

export const NAV_ITEMS = [
  { icon: <MapPin className="w-4 h-4 mb-1" />, label: "위치", path: "/location" },
  { icon: <Edit className="w-4 h-4 mb-1" />, label: "글쓰기", path: "/write" },
  { icon: <List className="w-4 h-4 mb-1" />, label: "근처 글", path: "/nearby" },
  { icon: <Settings className="w-4 h-4 mb-1" />, label: "설정", path: "/settings" },
];
