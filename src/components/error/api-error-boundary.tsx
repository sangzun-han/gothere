import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ApiError } from "@/types/erorr";
import { Button } from "../ui/button";
import { XCircle, Search, RefreshCcw, User2Icon } from "lucide-react";

interface ApiErrorBoundaryProps {
  children: ReactNode;
  onReset: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: { error: ApiError; resetErrorBoundary: () => void }) => {
  const handleReset = () => {
    resetErrorBoundary();
  };

  const errorMessageStyles = "text-lg text-gray-800 font-semibold mt-4";

  switch (error.status) {
    case 404:
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <XCircle className="w-16 h-16 text-yellow-500" />
          <h2 className={`${errorMessageStyles} text-2xl text-gray-700`}>게시글을 찾을 수 없습니다</h2>
          <Button
            onClick={handleReset}
            className="mt-6 px-6 py-3 bg-brand-primary text-white rounded-full hover:bg-brand-hover transition duration-300"
          >
            다시 시도
          </Button>
        </div>
      );
    case 401:
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <User2Icon className="w-16 h-16 text-yellow-500" />
          <h2 className={`${errorMessageStyles} text-2xl text-gray-700`}>인증정보를 다시 확인해주세요</h2>
          <Button
            onClick={handleReset}
            className="mt-6 px-6 py-3 bg-brand-primary text-white rounded-full hover:bg-brand-hover transition duration-300"
          >
            다시 시도
          </Button>
        </div>
      );
    case 400:
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <Search className="w-16 h-16 text-blue-500" />
          <h2 className={`${errorMessageStyles} text-2xl text-gray-700`}>잘못된 요청입니다</h2>
          <p className="text-sm text-gray-600 mt-2">{error.message}</p>
          <Button
            onClick={handleReset}
            className="mt-6 px-6 py-3 bg-brand-primary text-white rounded-full hover:bg-brand-hover transition duration-300"
          >
            다시 시도
          </Button>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <RefreshCcw className="w-16 h-16 text-red-500" />
          <h2 className={`${errorMessageStyles} text-2xl text-gray-700`}>오류가 발생했습니다</h2>
          <p className="text-sm text-gray-600 mt-2">잠시 후 다시 시도해주세요</p>
          <Button
            onClick={handleReset}
            className="mt-6 px-6 py-3 bg-brand-primary text-white rounded-full hover:bg-brand-hover transition duration-300"
          >
            다시 시도
          </Button>
        </div>
      );
  }
};

export const ApiErrorBoundary = ({ children, onReset }: ApiErrorBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
};
