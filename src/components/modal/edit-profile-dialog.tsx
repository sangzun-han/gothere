"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { ProfileFormValues, profileSchema } from "@/schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "../spinner/spinner";

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: ProfileFormValues;
  onSubmit: (data: ProfileFormValues) => void;
}
export default function EditProfileDialog({ isOpen, onClose, defaultValues, onSubmit }: EditProfileDialogProps) {
  const { register, handleSubmit, setValue, watch, formState, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const { errors, isSubmitting } = formState;
  const profileUrl = watch("profileUrl");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileUrl", file);
    }
  };

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[320px] md:max-w-[425px] p-6 rounded-lg shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-zinc-800">프로필 수정</DialogTitle>
          <DialogDescription className="text-sm text-center text-zinc-500 mt-2">
            나를 표현하는 프로필 이미지와 닉네임을 설정해보세요
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8 mt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group cursor-pointer">
                <Avatar className="w-24 h-24 relative">
                  <AvatarImage
                    src={profileUrl instanceof File ? URL.createObjectURL(profileUrl) : profileUrl}
                    alt="Profile"
                  />
                  <AvatarFallback>프로필</AvatarFallback>
                </Avatar>
                <Input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="absolute bottom-0 right-0 p-2 bg-brand-primary rounded-full hover:bg-brand-hover">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-sm font-medium text-zinc-700">
                닉네임
              </Label>
              <Input id="nickname" {...register("nickname")} />
              {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname.message}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button variant="outline" className="w-24" onClick={handleClose} type="button">
              취소
            </Button>
            <Button
              className={`w-24 ${
                isSubmitting ? "bg-brand-primary/70 cursor-not-allowed" : "bg-brand-primary hover:bg-brand-hover"
              } text-white flex justify-center items-center`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "저장"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
