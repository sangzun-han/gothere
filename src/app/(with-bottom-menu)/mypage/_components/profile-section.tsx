"use client";

import { Button } from "@/components/ui/button";
import { Edit3, FileText, Star } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import Image from "next/image";
import { useGetUser } from "@/lib/api/user/hooks";
import { notFound } from "next/navigation";

export default function ProfileSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetUser();

  if (!data || !data.data) return notFound();

  const { nickname, profile_url } = data.data;

  return (
    <section className="relative w-full flex-1 bg-white">
      <div className="w-full bg-white shadow-lg px-4 pb-20">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
              <Image
                src={profile_url}
                alt="profile"
                width={128}
                height={128}
                className="rounded-full object-cover hover:opacity-90 transition-opacity"
                priority
              />
            </div>
            <Button
              className="absolute bottom-2 right-2 p-2 bg-brand-primary rounded-full hover:bg-brand-hover"
              size="icon"
            >
              <Edit3 className="w-4 h-4 text-white" />
            </Button>
          </div>
          <h1 className="text-xl font-semibold mt-4">{nickname}</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <FileText className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-primary">내가 쓴 글</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-text-primary">관심 목록</span>
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>준비 중</DialogTitle>
            <DialogDescription>이 기능은 아직 준비 중입니다. 곧 만나보실 수 있습니다!</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsModalOpen(false)}>닫기</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
