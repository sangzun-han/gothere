"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface ComingSoonDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonDialog({ isOpen, onClose }: ComingSoonDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[280px] md:max-w-[425px] p-6 rounded-lg shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-left">준비 중</DialogTitle>
          <DialogDescription className="text-left">이 기능은 아직 준비 중입니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end mt-4">
            <Button onClick={onClose} className="bg-brand-primary hover:bg-brand-hover">
              닫기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
