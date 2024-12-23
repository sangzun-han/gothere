export default function ProfileSectionFallback() {
  return (
    <section className="relative w-full flex-1 bg-white animate-pulse">
      <div className="w-full bg-white shadow-lg px-4 pb-20">
        <div className="flex flex-col items-center">
          <div className="relative group py-2">
            <div className="w-32 h-32 rounded-full bg-gray-200 "></div>
          </div>

          <div className="w-24 h-6 bg-gray-200 rounded mt-4"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="w-full h-8 bg-gray-200 rounded"></div>
          <div className="w-full h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </section>
  );
}
