"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100 text-red-700">
      <div className="text-center">
        <h1 className="text-2xl font-bold">오류가 발생했습니다</h1>
        <p className="my-4">{error.message || "알 수 없는 오류가 발생했습니다."}</p>
        <button onClick={reset} className="mt-4 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600">
          다시 시도
        </button>
      </div>
    </div>
  );
}
