import { z } from "zod";

export const profileSchema = z.object({
  profileUrl: z
    .union([
      z.string().url("올바른 URL을 입력해주세요"),
      z.preprocess((value) => {
        if (typeof window !== "undefined" && value instanceof File) {
          return value;
        }
        return undefined;
      }, z.any()),
    ])
    .optional(),
  nickname: z.string().min(3, "닉네임은 최소 3글자 이상이어야 합니다"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
