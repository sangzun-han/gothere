"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Edit3, FileText, Settings, Star, MapPin, PenSquare, Target } from "lucide-react";

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="h-screen w-full flex flex-col bg-gray-50">
      <header className="relative w-full h-3/4 bg-gradient-to-b from-blue-400 to-blue-300">
        <div className="absolute inset-0 bg-black/20 flex justify-center items-center">
          <p className="text-white text-sm font-medium px-4 py-2 bg-black/30 rounded-full">
            닉네임 수정 외 준비중인 기능들입니다.
          </p>
        </div>
      </header>

      <section className="relative w-full flex-1 bg-white">
        <div className="w-full bg-white shadow-lg px-4 pb-20">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="rounded-full object-cover hover:opacity-90 transition-opacity"
                />
              </div>
              <Button
                className="absolute bottom-2 right-2 p-2 bg-brand-primary rounded-full hover:bg-brand-hover"
                size="icon"
              >
                <Edit3 className="w-4 h-4 text-white" />
              </Button>
            </div>
            <h1 className="text-xl font-semibold mt-4">닉네임</h1>
          </div>

          <nav className="grid grid-cols-2 gap-4 mt-4">
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
          </nav>
        </div>
      </section>

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
    </main>
  );
}
