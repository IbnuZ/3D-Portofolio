import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';

export default function SmartCanvas({ children, frameloop = "always", ...props }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. Cek ukuran layar untuk konfigurasi Mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 2. Pantau apakah Canvas sedang terlihat di layar (Viewport)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 } // Aktif jika minimal 5% area Canvas terlihat di layar
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        // Jika Canvas tidak terlihat di layar, hentikan render ("never")
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
        {children}
      </Canvas>
    </div>
  );
}