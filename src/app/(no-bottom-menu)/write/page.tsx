"use client";

import CustomFormField, { FormFieldType } from "@/components/forms/custom-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PostFormValidation } from "@/schemas/post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogKakao } from "@/components/kakao";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { ModalType } from "@/types/modals";
import { useRecoilValue } from "recoil";
import { extractDong } from "@/utils/location/extract-dong";
import { locationSelector } from "@/recoil/location/selector";
import { createPost } from "@/lib/api/posts/create";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import LocationErrorDrawer from "@/components/modal/location-error-drawer";
import Spinner from "@/components/spinner/spinner";
import { usePolygonCoordinates } from "@/lib/api/polygon/hooks";
import { LocationSelect } from "@/types/location/location";
import { uploadImages } from "@/utils/image/upload-supabase-image";

type PostFormValues = z.infer<typeof PostFormValidation>;

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostFormValidation),
    defaultValues: {
      title: "",
      content: "",
      images: [],
      location: "",
      latitude: 0,
      longitude: 0,
      city: "",
      district: "",
      dong: "",
      polygonPaths: [],
    },
  });

  const location = useRecoilValue(locationSelector);
  const [currentModal, setCurrentModal] = useState<ModalType>(ModalType.KAKAOMAP);
  const [isLoading, setIsLoading] = useState(false);
  const { data: polygonPaths } = usePolygonCoordinates(location.dong);

  const handleLocationSelect = (location: LocationSelect) => {
    form.setValue("location", location.addressName);
    form.setValue("city", location.si);
    form.setValue("district", location.gu);
    form.setValue("dong", location.dong);
    form.setValue("latitude", location.latitude);
    form.setValue("longitude", location.longitude);
    form.setValue("polygonPaths", polygonPaths);
    setCurrentModal(ModalType.NONE);
  };

  const onSubmit = async (values: PostFormValues) => {
    setIsLoading(true);
    try {
      const currentDong = extractDong(location.addressName);
      const selectedDong = extractDong(values.location);
      if (currentDong !== selectedDong) {
        setCurrentModal(ModalType.CONFIRMATION);
        return;
      }

      if (!values.polygonPaths || values.polygonPaths.length === 0) {
        toast({
          title: "작성 실패",
          description: "위치 데이터를 확인할 수 없습니다.",
          variant: "destructive",
          duration: 1000,
        });
        return;
      }

      const imageUrls = await uploadImages(values.images);

      const postData = {
        ...values,
        images: imageUrls,
      };

      await createPost(postData);

      toast({
        title: "작성 완료",
        description: "성공적으로 작성되었습니다.",
        duration: 1000,
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "작성 실패",
        description: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        variant: "destructive",
        duration: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="p-4 pb-20">
            <CustomFormField
              control={form.control}
              name="images"
              label="이미지"
              type={FormFieldType.FILE}
              onChange={(value) => form.setValue("images", value as File[])}
            />
            <CustomFormField
              control={form.control}
              name="location"
              label="위치"
              type={FormFieldType.LOCATION}
              renderCustomField={({ field }) => (
                <div className="relative" onClick={() => setCurrentModal(ModalType.KAKAOMAP)}>
                  <Input readOnly {...field} placeholder="위치를 선택하세요" className="text-sm cursor-pointer" />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-primary cursor-pointer" />
                </div>
              )}
            />
            <DialogKakao
              visible={currentModal === ModalType.KAKAOMAP}
              onClose={() => setCurrentModal(ModalType.NONE)}
              onSelect={handleLocationSelect}
            />
            <CustomFormField
              control={form.control}
              name="title"
              label="제목"
              type={FormFieldType.INPUT}
              placeholder="제목을 입력하세요"
            />
            <CustomFormField
              control={form.control}
              name="content"
              label="내용"
              type={FormFieldType.TEXTAREA}
              placeholder="내용을 입력하세요"
            />
          </div>
          <footer className="fixed bottom-0 w-full bg-white border-t border-gray-300 px-4 py-3">
            <Button
              type="submit"
              className={`w-full ${
                isLoading ? "bg-brand-primary/70 cursor-not-allowed" : "bg-brand-primary hover:bg-brand-hover"
              } text-white border-none`}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "작성하기"}
            </Button>
          </footer>
          <LocationErrorDrawer
            visible={currentModal === ModalType.CONFIRMATION}
            onClose={() => setCurrentModal(ModalType.NONE)}
            selectedAddressName={form.getValues("location")}
          />
        </form>
      </Form>
    </>
  );
}
