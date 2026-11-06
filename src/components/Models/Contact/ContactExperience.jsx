import { OrbitControls } from "@react-three/drei";
import { Computer } from "./Computer";
import SmartCanvas from "../../SmartCanvas";
import { useTheme } from "../../../context/ThemeContext";

const ContactExperience = () => {
  const { isDark } = useTheme();

  // Mode gelap: nuansa oranye hangat (asli). Mode terang: biru lembut agar senada dengan palet halaman.
  const floorColor = isDark ? "#a46b2d" : "#c7d7f5";
  const lightColor = isDark ? "#ffd9b3" : "#ffffff";

  return (
    <SmartCanvas shadows camera={{ position: [0, 3, 7], fov: 45 }}>
      <ambientLight intensity={isDark ? 0.5 : 0.8} color={isDark ? "#fff4e6" : "#ffffff"} />

      <directionalLight position={[5, 5, 3]} intensity={isDark ? 2.5 : 1.8} color={lightColor} />

      <directionalLight
        position={[5, 9, 1]}
        castShadow
        intensity={isDark ? 2.5 : 1.8}
        color={lightColor}
      />

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <group scale={[1, 1, 1]}>
        <mesh
          receiveShadow
          position={[0, -1.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color={floorColor} />
        </mesh>
      </group>

      <group scale={0.03} position={[0, -1.49, -2]} castShadow>
        <Computer />
      </group>
    </SmartCanvas>
  );
};

export default ContactExperience;
