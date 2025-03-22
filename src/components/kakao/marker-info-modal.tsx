import React from "react";
import Image from "next/image";
import { GeoPost } from "@/types/posts/posts";
import { useRouter } from "next/navigation";

interface MarkerInfoModalProps {
  post: GeoPost;
}

export default function MarkerInfoModal({ post }: MarkerInfoModalProps) {
  const router = useRouter();

  return (
    <div className="bg-whhite p-4 rounded-sm cursor-pointer" onClick={() => router.push(`/posts/${post.id}`)}>
      <div className="flex items-center mb-4 min-w-0">
        <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
          <Image
            src={post.thumbnail || "https://via.placeholder.com/56"}
            alt={post.title}
            width={56}
            height={56}
            className="object-cover w-full h-full"
            blurDataURL={post.thumbnail_blur_image}
            placeholder="blur"
          />
        </div>

        <div className="flex-1 min-w-0 text-white">
          <h2 className="text-lg font-bold truncate">{post.title}</h2>
          <p className="text-sm truncate">{post.content}</p>
        </div>
      </div>

      <div className="text-sm text-white">{post.location}</div>
    </div>
  );
}
