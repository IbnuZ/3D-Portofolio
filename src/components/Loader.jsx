import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

const Loader = ({ label = "Preparing 3D experience..." }) => {
  const { active, progress, total, loaded } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  // Smooth progress counter & ensure it reaches 100% cleanly once assets finish
  useEffect(() => {
    const rawTarget = total > 0 ? Math.min(100, Math.round(progress)) : 35;
    const timer = window.setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= rawTarget) return prev;
        const step = Math.max(1, Math.ceil((rawTarget - prev) * 0.25));
        return Math.min(rawTarget, prev + step);
      });
    }, 30);

    return () => window.clearInterval(timer);
  }, [progress, total]);

  useEffect(() => {
    // Wait until Three.js starts loading and finishes all queued assets (or fallback timeout)
    const isFinished = !active && total > 0 && loaded >= total;

    if (isFinished) {
      setDisplayProgress(100);
      const fadeTimer = window.setTimeout(() => setFadingOut(true), 250);
      const hideTimer = window.setTimeout(() => setVisible(false), 750);
      return () => {
        window.clearTimeout(fadeTimer);
        window.clearTimeout(hideTimer);
      };
    }

    // Safety fallback so the screen never gets stuck if WebGL/assets take too long
    const fallbackTimer = window.setTimeout(() => {
      setDisplayProgress(100);
      setFadingOut(true);
      window.setTimeout(() => setVisible(false), 500);
    }, 6500);

    return () => window.clearTimeout(fallbackTimer);
  }, [active, total, loaded]);

  // Lock body scroll while loading overlay is visible
  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`loader-overlay ${fadingOut ? "loader-fade-out" : ""}`}
    >
      <div className="loader-card">
        {/* Dual ring 3D-style spinner */}
        <div className="loader-spinner-wrap">
          <div className="loader-ring-outer" />
          <div className="loader-ring-inner" />
          <span className="loader-percent">{displayProgress}%</span>
        </div>

        <div className="text-center space-y-1.5">
          <p className="loader-title">Ibnu | Nasrulloh</p>
          <p className="loader-subtitle">{label}</p>
        </div>

        {/* Progress Bar */}
        <div className="loader-bar-track">
          <div
            className="loader-bar-fill"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
