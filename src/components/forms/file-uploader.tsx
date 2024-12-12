"use client";

import { Camera, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { FormLabel } from "../ui/form";

interface FileUploaderProps {
  value: File[];
  onChange: (files: File[]) => void;
}

export default function FileUploader({ value, onChange }: FileUploaderProps) {
  const [previewImages, setPreviewImages] = useState<{ file: File; url: string }[]>([]);

  // 미리보기 이미지 URL 생성
  useEffect(() => {
    const newPreviewImages = value.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviewImages(newPreviewImages);

    return () => {
      newPreviewImages.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [value]);

  // 파일 추가
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const updatedFiles = [...value, ...newFiles];
    onChange(updatedFiles);
  };

  // 파일 제거
  const handleRemoveImage = (index: number) => {
    const updatedFiles = value.filter((_, i) => i !== index);
    onChange(updatedFiles);
  };

  return (
    <div className="flex items-center space-x-4 py-4 overflow-x-auto">
      {/* 업로드 버튼 */}
      <FormLabel
        htmlFor="upload"
        className="min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] flex items-center justify-center bg-gray-100 border border-gray-300 rounded cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center">
          <Camera className="w-4 h-4" />
          <span className="text-xs">{`${previewImages.length}/10`}</span>
        </div>
      </FormLabel>

      {/* 실제 Input 요소 (hidden) */}
      <input type="file" id="upload" accept="image/*" multiple hidden onChange={handleFileChange} />

      {/* 미리보기 영역 */}
      <div className="flex items-center space-x-4">
        {previewImages.map((image, index) => (
          <div
            key={index}
            className="relative flex items-center justify-center border rounded w-[56px] h-[56px] cursor-pointer"
          >
            {/* 미리보기 이미지 */}
            <Image
              src={image.url}
              alt={`Preview ${index}`}
              className="rounded object-cover w-full h-full"
              width={56}
              height={56}
            />
            {/* 삭제 버튼 */}
            <Button
              type="button"
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 w-6 h-6 border border-gray-300 hover:bg-gray-200"
              size="icon"
              onClick={() => handleRemoveImage(index)}
            >
              <X className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
