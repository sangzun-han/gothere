"use client";

import { PlusIcon, MinusIcon } from "lucide-react";

interface MapZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function MapZoomControl({ onZoomIn, onZoomOut }: MapZoomControlsProps) {
  return (
    <div className="absolute top-2 left-2 flex flex-col gap-2 z-50">
      <button onClick={onZoomIn} className="p-2 bg-white rounded-full shadow-md text-lg font-bold" aria-label="확대">
        <PlusIcon className="w-4 h-4" />
      </button>
      <button onClick={onZoomOut} className="p-2 bg-white rounded-full shadow-md text-lg font-bold" aria-label="축소">
        <MinusIcon className="w-4 h-4 text-text-primary" />
      </button>
    </div>
  );
}
