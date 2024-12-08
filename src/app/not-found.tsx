export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-2xl font-bold">오류가 발생했습니다</h1>
        <p className="my-4">{"알 수 없는 오류가 발생했습니다."}</p>
        <button className="mt-4 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600">다시 시도</button>
      </div>
    </div>
  );
}
