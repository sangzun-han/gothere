import React from "react";

interface KakaoMapLoadingProps {
  visible?: boolean;
}

export default function KakaoMapLoading({ visible = true }: KakaoMapLoadingProps) {
  return (
    <div
      className={`flex items-center justify-center w-full h-full absolute top-0 left-0 bg-white transition-opacity duration-300 ${
        visible ? "opacity-100 z-50" : "opacity-0 z-[-1]"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-secondary h-12 w-12 mb-4"></div>
        <p className="text-text-primary">{"카카오 맵 로딩 중입니다..."}</p>
      </div>
      <style jsx>{`
        .loader {
          border-top-color: #5952ff;
          animation: spinner 1s linear infinite;
        }
        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
