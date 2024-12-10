import { z } from "zod";

export const PostFormValidation = z.object({
  title: z.string().min(1, "제목은 필수입니다."),
  content: z.string().min(1, "내용은 필수입니다."),
  images: z.array(z.instanceof(File)).optional(),
});

export type PostFormValues = z.infer<typeof PostFormValidation>;
