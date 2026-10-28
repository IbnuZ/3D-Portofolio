import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext";

export default function SmartCanvas({
  children,
  frameloop = "always",
  ...props
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={isVisible ? frameloop : "never"}
        dpr={[1, isMobile ? 1.25 : 2]}
        gl={{
          antialias: !isMobile,
          powerPreference: "high-performance",
          alpha: true,
        }}
        shadows={!isMobile}
        {...props}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <ambientLight
          intensity={isDark ? 0.4 : 1.3}
          color={isDark ? "#ffffff" : "#fff8f0"}
        />
        <hemisphereLight
          skyColor={isDark ? "#1e1b4b" : "#e0f2fe"}
          groundColor={isDark ? "#000000" : "#f1f5f9"}
          intensity={isDark ? 0.3 : 0.9}
        />

        {children}
      </Canvas>
    </div>
  );
}
