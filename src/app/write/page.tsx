"use client";

import { CustomFormField } from "@/components/forms";
import { FormFieldType } from "@/components/forms/custom-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PostFormValidation } from "@/schemas/post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PostFormValues = z.infer<typeof PostFormValidation>;

export default function Page() {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostFormValidation),
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });

  const onSubmit = (values: any) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4">
        <CustomFormField
          control={form.control}
          name="images"
          label="이미지 업로드"
          type={FormFieldType.FILE}
          onChange={(value) => form.setValue("images", value as File[])}
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

        <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-hover text-white">
          작성하기
        </Button>
      </form>
    </Form>
  );
}
