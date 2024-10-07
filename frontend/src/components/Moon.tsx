'use client'
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three"
import MissionPoint from "@/components/MissionPoint"
import { useTexture } from "@react-three/drei";

interface Props {
  isPageHome: boolean
};

export default function Moon({isPageHome}: Props) {
  const mesh = useRef<THREE.Mesh>(null!);
  const { viewport, camera } = useThree();
  const [colorMap, bumpMap] = useTexture([
    "/textures/moon/moonColorMap.jpg",
    "/textures/moon/moonDisplacementMap.jpg",
  ]);

  useEffect(() => {
    if (!isPageHome) {
      camera.position.set(14, 1, -1); 
      camera.lookAt(0, 0, 0); 
    } 
  }, [isPageHome, camera]);

  // useFrame(() => {
  //   if (!isPageHome) return;
  //   mesh.current.rotation.y += 0.004;
  //   mesh.current.rotation.x += 0.0001;
  // });

  const apolloCoordinates = [
    { lat: -3.1975, lon: -23.3856, identifier: "Apollo 12", image: "/missions/apollo12.png", id: 12 },
    { lat: 26.1008, lon: 3.6527, identifier: "Apollo 15", image: "/missions/apollo15.png", id: 15 },
    { lat: -8.9913, lon: 15.5144, identifier: "Apollo 16", image: "/missions/apollo16.png", id: 16 }
  ];

  return (
    <group scale={viewport.width / 8}>
      <mesh ref={mesh} position={isPageHome ? [1.9, 0, 0] : [0, 0.15, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="0xffffff"
          map={colorMap}
          displacementMap={bumpMap}
          displacementScale={0.06}
          bumpMap={bumpMap}
          bumpScale={0.04}
          reflectivity={0.2}
          shininess={0}
        />
      </mesh>
      {apolloCoordinates.map((item) =>
        <MissionPoint key={item.id} lat={item.lat} lon={item.lon} identifier={item.identifier} image={item.image} imgWidth={0.258} imgHeight={0.09649} />
      )}
    </group>
  );
}
