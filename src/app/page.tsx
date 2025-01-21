const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#312e81] to-[#0f172a] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="relative w-full h-full opacity-40">
          <div className="absolute top-16 left-12 w-40 h-40 rounded-full bg-gradient-to-br from-[#ec4899] to-[#f59e0b] animate-pulse" />
          <div className="absolute bottom-32 right-16 w-56 h-56 rounded-full bg-gradient-to-br from-[#34d399] to-[#06b6d4] animate-bounce" />
          <div className="absolute top-64 left-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#6366f1] animate-pulse" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#f59e0b] via-[#ec4899] to-[#ef4444] text-transparent bg-clip-text">
          TeliPhotos
        </h1>
        <p className="text-xl text-gray-300">
          Unlimited storage for your photos and videos, coming soon!
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} SnapCloud. All rights reserved.
      </footer>
    </div>
  );
};

export default ComingSoon;
