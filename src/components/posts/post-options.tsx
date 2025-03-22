"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useDeletePost } from "@/lib/api/posts/hooks";
import Spinner from "../spinner/spinner";

export default function PostOptions({ postId }: { postId: string }) {
  const deletePostMutation = useDeletePost(postId);

  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="text-gray-900" type="button" size="icon" variant="ghost">
            <MoreVertical className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>삭제하기</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="w-full max-w-[320px] md:max-w-[425px] p-4 rounded-lg shadow-lg bg-app-background">
          <AlertDialogHeader>
            <AlertDialogTitle>게시글을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>삭제된 게시글은 복구할 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              className={`bg-blue-500 border-none disabled:bg-blue-500/70 disabled:cursor-not-allowed hover:bg-blue-600`}
              onClick={() => deletePostMutation.mutate()}
              disabled={deletePostMutation.isPending}
            >
              {deletePostMutation.isPending ? <Spinner /> : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
