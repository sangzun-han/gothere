import React from "react";
import Image from "next/image";
import { Post } from "@/types/posts/posts";
import { Button } from "../ui/button";

interface MarkerInfoModalProps {
  post: Post;
}

export default function MarkerInfoModal({ post }: MarkerInfoModalProps) {
  return (
    <div className="bg-white p-4">
      <div className="flex items-center mb-4">
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
        <div>
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="text-sm text-gray-500 line-clamp-1 whitespace-nowrap text-ellipsis">{post.content}</p>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-4">{post.location}</div>
      <Button className="bg-brand-primary hover:bg-brand-hover text-white w-full py-2 rounded-lg text-sm font-semibold">
        자세히보기
      </Button>
    </div>
  );
}
