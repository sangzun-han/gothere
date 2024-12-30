"use client";

import { supabase } from "../supabase/js-client";
import { StorageApiError, StorageUnknownError } from "@supabase/storage-js/dist/module/lib/errors";

export const uploadImages = async (files: File[]): Promise<string[]> => {
  try {
    const uploadUrls = await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("post-images").upload(fileName, file);

        if (error) {
          if (error instanceof StorageApiError) {
            throw new StorageApiError(`이미지 업로드 실패: ${error.message}`, error.status);
          } else if (error instanceof StorageUnknownError) {
            throw new StorageUnknownError("알 수 없는 에러 발생", error);
          } else {
            throw new Error("예상치 못한 에러 발생");
          }
        }

        const { data: publicData } = supabase.storage.from("post-images").getPublicUrl(fileName);
        if (!publicData) {
          throw new StorageUnknownError("이미지 URL 생성 실패", null);
        }
        return publicData.publicUrl;
      })
    );

    return uploadUrls;
  } catch (error) {
    if (error instanceof StorageApiError) {
      throw error;
    } else if (error instanceof StorageUnknownError) {
      throw error;
    } else {
      throw new Error("예상치 못한 에러 발생");
    }
  }
};
