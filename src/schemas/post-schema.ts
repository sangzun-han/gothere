import { z } from "zod";

export const PostFormValidation = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요."),
  images: z.any().optional(),
  location: z.string().min(1, "위치 내용을 입력해주세요."),
  latitude: z.number({
    required_error: "위도 값을 입력해주세요.",
    invalid_type_error: "위도 값은 숫자여야 합니다.",
  }),
  longitude: z.number({
    required_error: "경도 값을 입력해주세요.",
    invalid_type_error: "경도 값은 숫자여야 합니다.",
  }),
});

export type PostFormValues = z.infer<typeof PostFormValidation>;
