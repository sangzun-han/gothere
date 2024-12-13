"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="relative bg-white rounded-3xl shadow-lg border-4 border-dashed border-red-300 p-8 max-w-lg text-center">
        <div
          className="absolute bottom-0 right-0 w-0 h-0 
        border-solid border-l-[50px] border-b-[50px] 
        border-l-transparent border-b-red-200 opacity-50"
        ></div>

        <div className="text-6xl font-extrabold text-red-800 mb-4">Error</div>
        <div className="text-xl font-semibold text-red-600 mb-2">오류가 발생했습니다.</div>
        <p className="text-red-500 text-sm mb-6">{error.message || "알 수 없는 오류가 발생했습니다."}</p>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={reset}
            className="px-5 py-3 bg-red-700 text-white font-medium rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition"
          >
            다시 시도
          </Button>

          <Button
            onClick={() => router.back()}
            className="px-5 py-3 bg-gray-200 text-gray-700 font-medium rounded-md shadow hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
          >
            이전 페이지로 가기
          </Button>
        </div>
      </div>
    </div>
  );
}
