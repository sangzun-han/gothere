"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostOptions from "@/components/posts/post-options";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";

export default function PostDetailHeader({ id, postAuthorId }: { id: string; postAuthorId: string }) {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <header className="w-full flex items-center px-2 border-b border-gray-300 h-[52px] max-h-[52px] justify-between">
      <Button className="text-text-primary" type="button" size="icon" variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="w-6 h-6" />
      </Button>
      {userId === postAuthorId ? <PostOptions postId={id} /> : null}
    </header>
  );
}
