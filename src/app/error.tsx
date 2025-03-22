"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-app-background px-6">
      <div className="relative bg-app-background p-8 max-w-lg text-center">
        <div className="text-6xl font-extrabold text-gray-700 mb-4">
          <RefreshCcw className="w-16 h-16 text-red-500 mx-auto" />
        </div>
        <div className="text-xl font-semibold text-gray-700 mb-2">오류가 발생했습니다</div>
        <p className="text-gray-500 text-sm mb-4">{error.message}</p>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={reset}
            className="px-5 py-3 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600"
          >
            다시 시도하기
          </Button>

          <Button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md shadow hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
          >
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  );
}
