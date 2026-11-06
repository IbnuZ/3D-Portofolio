import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={(e) => toggleTheme(e)}
      aria-label="Toggle Theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle group"
    >
      <span className="theme-toggle-icon-wrap" aria-hidden="true">
        {/* Ikon Matahari (Muncul saat Dark Mode -> klik untuk Light Mode) */}
        <svg
          className={`theme-toggle-icon ${
            isDark ? "is-active text-amber-400" : "is-hidden -rotate-90 text-amber-400"
          }`}
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

        {/* Ikon Bulan (Muncul saat Light Mode -> klik untuk Dark Mode) */}
        <svg
          className={`theme-toggle-icon ${
            !isDark ? "is-active text-indigo-600" : "is-hidden rotate-90 text-indigo-400"
          }`}
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
      </span>

      <span className="theme-toggle-label hidden sm:inline">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
