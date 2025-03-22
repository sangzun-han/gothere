export default function PostsFallback() {
  return (
    <article className="bg-app-background p-4 min-h-screen">
      <section className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <article
            key={i}
            className="relative bg-app-background rounded-lg shadow-lg p-6 border border-gray-300 
              transform transition hover:rotate-1 hover:scale-[1.02] cursor-pointer"
          >
            <figure className="absolute top-4 right-4 w-16 h-16 rounded-lg border-2 border-gray-400 p-1 bg-app-background shadow-md rotate-6 flex items-center justify-center">
              <div className="w-full h-full bg-gray-300 animate-pulse rounded" />
              <figcaption className="absolute -top-2 -left-2 w-4 h-4 bg-gray-300 animate-pulse rounded-full"></figcaption>
            </figure>

            <section className="pr-16 text-gray-900 space-y-2">
              <div className="w-3/4 h-5 bg-gray-300 animate-pulse rounded" />
              <div className="w-full h-4 bg-gray-300 animate-pulse rounded" />
              <div className="w-5/6 h-4 bg-gray-300 animate-pulse rounded" />
              <div className="w-2/3 h-4 bg-gray-300 animate-pulse rounded" />
            </section>

            <footer className="flex justify-between items-end mt-4">
              <div className="w-1/4 h-4 bg-gray-300 animate-pulse rounded" />
              <div className="w-1/6 h-4 bg-gray-300 animate-pulse rounded" />
            </footer>

            <div
              className="absolute bottom-0 right-0 w-0 h-0 
                border-solid border-l-[30px] border-b-[30px] 
                border-l-transparent border-b-gray-300 opacity-50"
            ></div>
          </article>
        ))}
      </section>
    </article>
  );
}
