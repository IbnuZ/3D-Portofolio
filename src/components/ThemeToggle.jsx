import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-300 shadow-sm
        bg-white/80 border-slate-200 text-slate-800 hover:bg-slate-100
        dark:bg-slate-900/80 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 backdrop-blur-md"
    >
      {isDark ? (
        <>
          {/* Ikon Matahari (Untuk beralih ke Mode Terang) */}
          <svg
            className="w-5 h-5 text-amber-400 animate-spin-slow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
          <span className="text-xs font-semibold hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          {/* Ikon Bulan (Untuk beralih ke Mode Gelap) */}
          <svg
            className="w-5 h-5 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <span className="text-xs font-semibold hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}
