import { z } from "zod";

export const PostFormValidation = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요."),
  images: z
    .array(z.any(), {
      required_error: "이미지를 최소 1개 이상 업로드해주세요.",
      invalid_type_error: "이미지는 배열이어야 합니다.",
    })
    .min(1, "이미지는 최소 1개 이상 업로드해야 합니다.")
    .max(10, "이미지는 최대 10개까지만 업로드할 수 있습니다."),
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
