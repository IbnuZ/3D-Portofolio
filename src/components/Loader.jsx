// src/components/Loader.jsx
const Loader = ({ progress = 0, label = "Preparing your portfolio..." }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 text-white backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-cyan-400" />
        <div className="text-center">
          <p className="text-lg font-medium">{label}</p>
          <p className="mt-1 text-sm text-white/60">{Math.round(progress)}%</p>
        </div>
        <div className="h-2 w-48 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
