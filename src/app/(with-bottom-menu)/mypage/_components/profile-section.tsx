"use client";

import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { useState } from "react";
import { useGetUser, useGetUserStats, useUpdateUser } from "@/lib/api/user/hooks";
import { notFound, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import EditProfileDialog from "@/components/modal/edit-profile-dialog";
import ProfileStat from "./profile-stat";

export default function ProfileSection() {
  const router = useRouter();
  const { data } = useGetUser();
  const { data: userStats } = useGetUserStats();
  const { toast } = useToast();
  const { mutateAsync } = useUpdateUser();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!data || !data.data) return notFound();

  const { nickname, profile_url } = data.data;
  const { postCount, favoritesCount } = userStats.data ?? { postCount: 0, favoritesCount: 0 };

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
    <section className="w-full">
      <div className="relative w-full h-32 bg-brand-primary" />
      <div className="relative">
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image
            src={profile_url}
            alt="profile"
            width={96}
            height={96}
            className="w-full h-full rounded-full object-cover hover:opacity-90 transition-opacity"
            priority
          />
        </div>
      </div>

      <div className="mt-12 text-center">
        <h1 className="text-lg font-semibold">{nickname}</h1>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button variant="link" size="sm" onClick={() => setIsEditModalOpen(true)}>
            <Edit3 className="w-4 h-4" />
            프로필 편집
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 max-w-md mx-auto text-center gap-4">
          <ProfileStat label="게시글" value={postCount} />
          <ProfileStat label="관심목록" value={favoritesCount} />
        </div>
      </div>

      <div className="max-w-full mt-8 flex flex-col gap-2">
        <div className="px-4 py-3 cursor-pointer" onClick={() => router.push("/mypage/posts")}>
          내가 쓴 글
        </div>
        <hr className="border-gray-200" />

        <div className="px-4 py-3 cursor-pointer" onClick={() => router.push("/likes")}>
          관심 목록
        </div>
        <hr className="border-gray-200" />

        <div className="px-4 py-3 cursor-pointer">로그아웃</div>
        <hr className="border-gray-200" />
      </div>

      <EditProfileDialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        defaultValues={{ profileUrl: profile_url, nickname }}
        onSubmit={handleSave}
      />
    </section>
  );
}
