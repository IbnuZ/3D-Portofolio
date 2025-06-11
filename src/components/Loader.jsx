// src/components/Loader.jsx
import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

const Loader = () => {
  const { progress } = useProgress();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => setIsDone(true), 500); // kasih transisi smooth
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center flex-col text-white transition-opacity duration-500">
      <p className="text-lg mb-2">Loading {progress.toFixed(0)}%</p>
      <div className="w-40 h-2 bg-gray-700">
        <div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default Loader;
