import { Control, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import FileUploader from "./file-uploader";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";

export enum FormFieldType {
  INPUT = "INPUT",
  TEXTAREA = "TEXTAREA",
  SELECT = "SELECT",
  FILE = "FILE",
  LOCATION = "LOCATION",
}

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  type: FormFieldType;
  placeholder?: string;
  onChange?: (value: string | File[]) => void;
  value?: any;
  renderCustomField?: (props: { field: any; fieldState: any }) => React.ReactNode;
}

const renderField = (
  type: FormFieldType,
  field: any,
  placeholder?: string,
  onChange?: (value: string | File[]) => void
) => {
  switch (type) {
    case FormFieldType.INPUT:
      return (
        <Input
          placeholder={placeholder}
          {...field}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e.target.value);
          }}
          className="text-sm"
        />
      );
    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={placeholder}
          {...field}
          className="resize-none h-48 text-sm"
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e.target.value);
          }}
        />
      );
    case FormFieldType.FILE:
      return <FileUploader value={field.value || []} onChange={onChange || (() => {})} />;
    case FormFieldType.LOCATION:
      return (
        <div className="relative">
          <Input
            readOnly
            {...field}
            placeholder={placeholder || "위치를 선택하세요"}
            className="text-sm cursor-pointer"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-primary pointer-events-none" />
        </div>
      );
    default:
      return null;
  }
};

export default function CustomFormField({
  control,
  name,
  label,
  type,
  placeholder,
  onChange,
  renderCustomField,
}: CustomFormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={type !== FormFieldType.FILE ? "mt-4" : ""}>
          {label !== "이미지" && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {renderCustomField
              ? renderCustomField({ field, fieldState })
              : renderField(type, field, placeholder, onChange)}
          </FormControl>{" "}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
