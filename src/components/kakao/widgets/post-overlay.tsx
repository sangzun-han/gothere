"use client";

import { Button } from "@/components/ui/button";
import { GeoPost } from "@/types/posts/posts";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface PostOverlayProps {
  post: GeoPost;
  onClose: () => void;
  isReturning: boolean;
}

export default function PostOverlay({ post, onClose, isReturning }: PostOverlayProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const overlayParent = overlayRef.current?.parentElement?.parentElement;
    if (overlayParent) {
      overlayParent.style.zIndex = "48";
      overlayParent.style.transition = "opacity 0.3s";
      overlayParent.style.opacity = isReturning ? "0" : "1";
    }
  }, [isReturning]);

  return (
    <CustomOverlayMap position={{ lat: post.latitude, lng: post.longitude }} yAnchor={1.05} zIndex={9999}>
      <div ref={overlayRef} className="relative w-72 bg-app-background rounded-lg shadow-lg px-3 py-2">
        <div className="flex justify-between items-center border-b">
          <h3 className="text-base font-semibold truncate max-w-[85%]" title={post.title}>
            {post.title}
          </h3>
          <Button size="icon" variant="link" onClick={onClose} className="w-4">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex mt-2">
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={post.thumbnail || "https://via.placeholder.com/64"}
              alt={post.title}
              className="object-cover w-full h-full"
              width={64}
              height={64}
              blurDataURL={post.thumbnail_blur_image}
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-gray-700">{post.location}</p>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm"
            onClick={() => {
              router.push(`/posts/${post.id}`);
            }}
          >
            상세 보기
          </Button>
        </div>
      </div>
    </CustomOverlayMap>
  );
}
