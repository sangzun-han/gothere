import { z } from "zod";

export const PostFormValidation = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요."),
  images: z.any().optional(),
  location: z.string().min(1, "위치 내용을 입력해주세요."),
});

export type PostFormValues = z.infer<typeof PostFormValidation>;
