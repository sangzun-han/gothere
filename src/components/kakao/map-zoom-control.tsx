"use client";

import { PlusIcon, MinusIcon } from "lucide-react";
import { Button } from "../ui/button";

interface MapZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function MapZoomControl({ onZoomIn, onZoomOut }: MapZoomControlsProps) {
  return (
    <div className="absolute top-2 left-2 flex flex-col gap-2 z-50">
      <Button
        onClick={onZoomIn}
        className="p-2 bg-white rounded-full shadow-md text-lg font-bold hover:bg-secondary-dark"
        aria-label="확대"
        size="icon"
      >
        <PlusIcon className="w-4 h-4 text-text-primary" />
      </Button>
      <Button
        onClick={onZoomOut}
        className="p-2 bg-white rounded-full shadow-md text-lg font-bold hover:bg-secondary-dark"
        aria-label="축소"
        size="icon"
      >
        <MinusIcon className="w-4 h-4 text-text-primary" />
      </Button>
    </div>
  );
}
