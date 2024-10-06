'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen'; // O caminho pode variar dependendo da estrutura do projeto
import { BottomNavBar } from './BottomNavBar';

interface Props {
  children: React.ReactNode; 
  enableControl: boolean;
  onCreated?: () => void;
};

const StarryBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const starSphereRef = useRef<THREE.Mesh>(null);
  const starmap = useTexture('/textures/starmap/stars.jpg');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (starSphereRef.current) {
      starSphereRef.current.rotation.y = scrollY * 0.0005;
    }
  });

  return (
    <Sphere ref={starSphereRef} args={[50, 64, 64]}>
      <meshBasicMaterial map={starmap} side={THREE.BackSide} />
    </Sphere>
  );
};

function FollowCameraLight() {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const { camera } = useThree();

  useFrame(() => {
    lightRef.current.position.x = camera.position.x - 1;
    lightRef.current.position.y = camera.position.y + 2;
    lightRef.current.position.z = camera.position.z + 2;
  });

  return <directionalLight ref={lightRef} intensity={3} />;
}

const SceneWithCursor = ({ children, enableControl }: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.cursor = isDragging ? 'grab' : 'default';
    }
  }, [isDragging]);

  return (
    <Canvas
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      shadows
      camera={{ position: [0, 0, 5], fov: 40 }}
    >
      <StarryBackground />
      <FollowCameraLight />
      {children}

      {enableControl && (
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          rotateSpeed={0.5}
          zoomSpeed={0.6}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          maxDistance={5}
          minDistance={2}
          enableDamping={true}
          dampingFactor={0.1}
        />
      )}
    </Canvas>
  );
};

export default function Scene({ children, enableControl }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <LoadingScreen isLoading={isLoading} />
      <SceneWithCursor
        enableControl={enableControl}
        onCreated={() => setIsLoading(false)}
      >
        {children}
      </SceneWithCursor>
      <BottomNavBar />
    </div>
  );
}
