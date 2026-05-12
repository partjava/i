export default function Loading() {
  return (
    <div className="flex p-8 gap-6">
      <aside className="hidden md:block w-56 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-3" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-100 rounded-lg mb-1 animate-pulse" />
          ))}
        </div>
      </aside>
      <div className="flex-1">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="h-10 bg-gray-100 rounded-lg animate-pulse mb-4" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
              <div className="h-4 w-full bg-gray-100 rounded mb-2" />
              <div className="h-4 w-2/3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
