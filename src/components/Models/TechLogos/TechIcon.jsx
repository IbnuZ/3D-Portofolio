import { Environment, Float, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import SmartCanvas from "../../SmartCanvas";
import { useTheme } from "../../../context/ThemeContext";

// Ukuran target (unit three.js) untuk sisi terpanjang setiap logo.
// Semua model dinormalisasi ke ukuran ini agar konsisten & selalu terlihat di kamera.
const TARGET_SIZE = 3.4;

const TechIcon = ({ model }) => {
  const { scene } = useGLTF(model.modelPath);
  const { isDark } = useTheme();

  // Clone + pusatkan + skala otomatis berdasarkan bounding box.
  // Ini memperbaiki model yang pivot-nya jauh dari pusat (mis. Git) sehingga tidak ter-render di layar.
  const normalized = useMemo(() => {
    const obj = scene.clone(true);
    const wrapper = new THREE.Group();
    if (model.rotation) obj.rotation.set(...model.rotation);
    wrapper.add(obj);
    wrapper.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(wrapper);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    obj.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    wrapper.scale.setScalar((TARGET_SIZE / maxDim) * (model.size ?? 1));
    return wrapper;
  }, [scene, model.rotation, model.size]);

  // Logo three.js aslinya hitam -> tidak terlihat di mode gelap.
  // Warnai mengikuti tema (putih di mode gelap, slate gelap di mode terang).
  useEffect(() => {
    if (!model.themeColor) return;
    const material = new THREE.MeshStandardMaterial({
      color: isDark ? "#ffffff" : "#1e293b",
      metalness: 0.2,
      roughness: 0.35,
    });
    normalized.traverse((child) => {
      if (child.isMesh) child.material = material;
    });
    return () => material.dispose();
  }, [normalized, isDark, model.themeColor]);

  return (
    <SmartCanvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 1 : 1.4} />
      {/* Environment lokal (tanpa download HDR dari CDN) */}
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 5, -5]} scale={[10, 5, 1]} />
        <Lightformer intensity={1.5} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer intensity={1.5} position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[10, 3, 1]} />
      </Environment>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Float speed={5.5} rotationIntensity={1} floatIntensity={0.9}>
        <primitive object={normalized} />
      </Float>
    </SmartCanvas>
  );
};

export default TechIcon;

// Preload seluruh model 3D TechStack agar progress terhitung di Loader & langsung mulus saat di-scroll
[
  "/models/react_logo-transformed.glb",
  "/models/flutter.glb",
  "/models/node-transformed.glb",
  "/models/three.js-transformed.glb",
  "/models/git-svg-transformed.glb",
].forEach((path) => useGLTF.preload(path));
