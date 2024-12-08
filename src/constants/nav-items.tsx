import { MapPin, Car, Shield, MessageSquare } from "lucide-react";

export const NAV_ITEMS = [
  { icon: <MapPin className="w-4 h-4 mb-1" />, label: "위치", path: "/location" },
  { icon: <Car className="w-4 h-4 mb-1" />, label: "운전", path: "/driving" },
  { icon: <Shield className="w-4 h-4 mb-1" />, label: "안전", path: "/safety" },
  { icon: <MessageSquare className="w-4 h-4 mb-1" />, label: "채팅", path: "/chat" },
];
