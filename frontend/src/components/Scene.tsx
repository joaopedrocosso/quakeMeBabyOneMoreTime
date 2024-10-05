'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';

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

const SceneWithCursor = ({children} : {children: React.ReactNode}) => {
    const [isDragging, setIsDragging] = useState(false);
  
    useEffect(() => {
      const canvas = document.querySelector('canvas'); // Obtém a referência ao canvas
      if (canvas) {
        canvas.style.cursor = isDragging ? 'grab' : 'default';
      }
    }, [isDragging]);
  
    return (
      <Canvas
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
      >

        <StarryBackground />
  
        {/* <directionalLight
            position={[-10, 12, 18]}
            intensity={3}
        /> */}

        <ambientLight 
            intensity={3}
        />
  
        {children}
  
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
      </Canvas>
    );
};

export default function Scene({children} : {children: React.ReactNode}) {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <SceneWithCursor>{children}</SceneWithCursor>
      </div>
    );
  }