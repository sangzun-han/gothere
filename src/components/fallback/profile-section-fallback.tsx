export default function ProfileSectionFallback() {
  return (
    <section className="w-full">
      <div className="relative w-full h-32 bg-brand-primary animate-pulse" />

      <div className="relative">
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
          <div className="w-full h-full bg-gray-300 animate-pulse rounded-full" />
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="h-6 w-32 bg-gray-300 animate-pulse rounded mx-auto mb-2" />

        <div className="flex items-center justify-center gap-2">
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
        </div>

        <div className="mt-6 grid grid-cols-2 max-w-md mx-auto text-center gap-4">
          <div className="flex flex-col items-center">
            <div className="h-5 w-16 bg-gray-300 animate-pulse rounded mb-1" />
            <div className="h-4 w-8 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="flex flex-col items-center">
            <div className="h-5 w-16 bg-gray-300 animate-pulse rounded mb-1" />
            <div className="h-4 w-8 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>

      <div className="max-w-full mt-8 flex flex-col gap-2">
        <div className="px-4 py-3">
          <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
        <hr className="border-gray-200" />

        <div className="px-4 py-3">
          <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
        <hr className="border-gray-200" />

        <div className="px-4 py-3">
          <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
        <hr className="border-gray-200" />
      </div>
    </section>
  );
}
