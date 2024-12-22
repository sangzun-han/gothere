import { MapPin } from "lucide-react";

export default function PostDetailFallback() {
  return (
    <main className="flex-1 min-h-0 overflow-y-auto pb-20 [&>article]:min-h-full">
      <article className="bg-white">
        <div className="w-full bg-white overflow-hidden">
          <section className="relative w-full h-64 bg-gray-300 animate-pulse">
            <div className="w-full h-full bg-gray-200"></div>
          </section>

          <div className="flex flex-1 p-4 space-x-6">
            <aside className="relative w-1/6 flex items-center justify-center">
              <p
                className="absolute left-4 top-4 text-sm text-gray-600 font-serif"
                style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
              >
                {`????-??-??`}
              </p>
            </aside>

            <section className="w-5/6 space-y-6">
              <div className="flex items-center space-x-4">
                <figure className="w-12 h-12 flex-shrink-0 rounded-full border border-gray-300 p-1 bg-white shadow-md overflow-hidden">
                  <div className="w-full h-full object-cover overflow-hidden bg-gray-200 animate-pulse rounded-full"></div>
                </figure>
                <div className="py-1 space-y-2 w-full">
                  <div className="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                  <div className="w-1/3 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>

              <div className="relative bg-white rounded-lg shadow-lg p-4 border-2 border-dashed border-gray-300">
                <div className="w-full h-6 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-full h-6 bg-gray-200 animate-pulse mt-2 rounded"></div>
                <div className="w-full h-6 bg-gray-200 animate-pulse mt-2 rounded"></div>
              </div>

              <section className="space-y-4">
                <div className="flex space-x-2 items-center">
                  <MapPin className="w-4 h-4 text-text-primary" />
                  <div className="w-1/4 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>

                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                </div>
              </section>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
