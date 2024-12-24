"use client";

import { Button } from "@/components/ui/button";
import { Edit3, FileText, Star } from "lucide-react";
import { useState } from "react";
import { useGetUser, useUpdateUser } from "@/lib/api/user/hooks";
import { notFound } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import ComingSoonDialog from "@/components/modal/coming-soon-dialog";
import EditProfileDialog from "@/components/modal/edit-profile-dialog";

export default function ProfileSection() {
  const { data } = useGetUser();
  const { toast } = useToast();
  const { mutateAsync } = useUpdateUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!data || !data.data) return notFound();

  const { nickname, profile_url } = data.data;

  const handleSave = async (updatedData: { nickname: string; profileUrl?: string | File }) => {
    const isImageChanged = updatedData.profileUrl && updatedData.profileUrl !== profile_url;
    const isNicknameChanged = updatedData.nickname !== nickname;

    if (!isImageChanged && !isNicknameChanged) {
      toast({
        title: "변경내용 없음",
        description: "변경된 내용이 없습니다",
        duration: 1000,
      });
      setIsEditModalOpen(false);
      return;
    }

    try {
      await mutateAsync(updatedData);
      toast({
        title: "업데이트 성공",
        description: "프로필이 업데이트 되었습니다.",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "업데이트 실패",
        description: "프로필 업데이트 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 1000,
      });
    } finally {
      setIsEditModalOpen(false);
    }
  };
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
                className="w-full h-full rounded-full object-cover hover:opacity-90 transition-opacity"
                priority
              />
            </div>
            <Button
              className="absolute bottom-2 right-2 p-2 bg-brand-primary rounded-full hover:bg-brand-hover"
              size="icon"
              onClick={() => setIsEditModalOpen(true)}
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

      <ComingSoonDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <EditProfileDialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        defaultValues={{ profileUrl: profile_url, nickname }}
        onSubmit={handleSave}
      />
    </section>
  );
}
