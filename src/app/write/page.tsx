"use client";

import { CustomFormField } from "@/components/forms";
import { FormFieldType } from "@/components/forms/custom-form-field";
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

type PostFormValues = z.infer<typeof PostFormValidation>;

export default function Page() {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostFormValidation),
    defaultValues: {
      title: "",
      content: "",
      images: [],
      location: "",
    },
  });

  const [isDialogVisible, setDialogVisible] = useState(false);

  const onSubmit = (values: any) => {
    console.log("Form submitted:", values);
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
                <div className="relative" onClick={() => setDialogVisible(true)}>
                  <Input readOnly {...field} placeholder="위치를 선택하세요" className="text-sm cursor-pointer" />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-primary cursor-pointer" />
                </div>
              )}
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
            <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-hover text-white border-none">
              작성하기
            </Button>
          </footer>
        </form>
      </Form>

      <DialogKakao visible={isDialogVisible} onClose={() => setDialogVisible(false)} />
    </>
  );
}
