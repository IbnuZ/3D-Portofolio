import React, { Suspense, useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <div className="hero-3d-placeholder" />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.2} color="#1a1a40" />
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={null}>
        <HeroLights />
        {!isMobile ? <Particles count={80} /> : null}
        <group
          scale={isMobile ? 0.7 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
