import React from "react";

export default function KakaoMapLoading() {
  return (
    <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 bg-white">
      <div className="flex flex-col items-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <p className="text-gray-600">{"카카오 맵 로딩 중입니다..."}</p>
      </div>
      <style jsx>{`
        .loader {
          border-top-color: #3498db;
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
