import { MapPin, Edit, Radar, User } from "lucide-react";

export const NAV_ITEMS = [
  { icon: <MapPin className="w-6 h-6 mb-1" />, label: "위치", path: "/" },
  { icon: <Edit className="w-6 h-6 mb-1" />, label: "글쓰기", path: "/write" },
  { icon: <Radar className="w-6 h-6 mb-1" />, label: "근처", path: "/nearby" },
  { icon: <User className="w-6 h-6 mb-1" />, label: "설정", path: "/mypage" },
];
