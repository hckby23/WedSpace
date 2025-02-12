export function SearchLoading() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center pt-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 h-64"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
