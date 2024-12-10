import { Control, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import FileUploader from "./file-uploader";
import { Textarea } from "../ui/textarea";

export enum FormFieldType {
  INPUT = "INPUT",
  TEXTAREA = "TEXTAREA",
  SELECT = "SELECT",
  FILE = "FILE",
}

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  type: FormFieldType;
  placeholder?: string;
  onChange?: (value: string | File[]) => void;
  value?: any;
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
        />
      );
    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={placeholder}
          {...field}
          className="resize-none h-64"
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e.target.value);
          }}
        />
      );
    case FormFieldType.FILE:
      return <FileUploader value={field.value || []} onChange={onChange || (() => {})} />;
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
  value,
}: CustomFormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{renderField(type, field, placeholder, onChange)}</FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
