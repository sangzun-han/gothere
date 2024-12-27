import { z } from "zod";

const CoordinateSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

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
  city: z.string().min(1, "시/도를 입력해주세요."),
  district: z.string().min(1, "구/군을 입력해주세요."),
  dong: z.string().min(1, "동을 입력해주세요."),
  latitude: z.number({
    required_error: "위도 값을 입력해주세요.",
    invalid_type_error: "위도 값은 숫자여야 합니다.",
  }),
  longitude: z.number({
    required_error: "경도 값을 입력해주세요.",
    invalid_type_error: "경도 값은 숫자여야 합니다.",
  }),

  polygonPaths: z
    .union([z.array(z.array(CoordinateSchema)), z.array(CoordinateSchema)])
    .refine((value) => Array.isArray(value) && value.length > 0, {
      message: "Polygon paths는 최소 한 개 이상의 경로가 필요합니다.",
    }),
});

export type PostFormValues = z.infer<typeof PostFormValidation>;
