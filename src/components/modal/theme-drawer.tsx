import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface ThemeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ThemeDrawer({ open, onOpenChange }: ThemeDrawerProps) {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme || "system");

  const handleSave = () => {
    setTheme(selectedTheme);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="z-[999] h-auto max-h-[fit-content]" tabIndex={-1}>
        <DrawerHeader className="text-center sm:ml-4">
          <DrawerTitle>테마 변경</DrawerTitle>
          <DrawerDescription>원하는 테마를 선택하세요.</DrawerDescription>
        </DrawerHeader>
        <RadioGroup defaultValue={selectedTheme} onValueChange={setSelectedTheme} className="space-y-4 px-4">
          <div className="flex items-center space-x-2 p-3 rounded-lg cursor-pointer">
            <RadioGroupItem value="light" id="theme-light" />
            <Label htmlFor="theme-light">밝은 테마</Label>
          </div>

          <div className="flex items-center space-x-2 p-3 rounded-lg cursor-pointer">
            <RadioGroupItem value="dark" id="theme-dark" />
            <Label htmlFor="theme-dark">어두운 테마</Label>
          </div>

          <div className="flex items-center space-x-2 p-3 rounded-lg cursor-pointer">
            <RadioGroupItem value="system" id="theme-system" />
            <Label htmlFor="theme-system">기기 테마와 동일</Label>
          </div>
        </RadioGroup>

        <DrawerFooter className="mt-4">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSave}>
            저장
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
