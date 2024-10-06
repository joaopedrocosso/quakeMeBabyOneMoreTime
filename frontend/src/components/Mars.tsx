'use client'
import { useTexture, Sphere, useGLTF, SpotLight } from '@react-three/drei';
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useRef, useState } from 'react';
import MissionPoint from "@/components/MissionPoint"

interface Props {
  isPageHome: boolean
};

export default function Mars({isPageHome}: Props) {
  const marsRef = useRef<THREE.Mesh>(null!);
  const {viewport} = useThree();
  const colorMap = useTexture('/textures/mars/marsColorMap.jpg');
  const [isQuaking, setIsQuaking] = useState(false);

  useFrame(() => {
    if(!isPageHome)
      return

		marsRef.current.rotation.y += 0.004;
		marsRef.current.rotation.x += 0.0001;
	});

  const quake = () => {
    if (marsRef.current) {
      setIsQuaking(true); 
      const initialPosition = marsRef.current.position.clone(); // Salvar posição inicial

      let quakeStart = performance.now(); // Tempo de início do tremor

      const quakeInterval = setInterval(() => {
        const elapsedTime = performance.now() - quakeStart;
        if (elapsedTime > 3000) {
          clearInterval(quakeInterval);
          setIsQuaking(false); // Desativar o tremor
          if (marsRef.current) { 
            marsRef.current.position.copy(initialPosition); 
          }
          return;
        }

        const quakeStrength = 0.01; 
        if (marsRef.current) { 
          marsRef.current.position.x = initialPosition.x + (Math.random() - 0.5) * quakeStrength;
          marsRef.current.position.y = initialPosition.y + (Math.random() - 0.5) * quakeStrength;
          marsRef.current.position.z = initialPosition.z + (Math.random() - 0.5) * quakeStrength;
        }
      }, 16); 
    }
  };

  const coordinates = [
		{ lat: 4.502384, lon: 135.623447, identifier: "Insight", id: 1},
		{ lat: 25, lon: -213, identifier: "Elysium Mons", id: 2},
	]

  return (
    <group scale={viewport.width / 8}>
      <Sphere ref={marsRef} args={[1, 64, 64]} castShadow receiveShadow position={isPageHome ? [-1.9, 0, 0] : [0, 0, 0]}>
        <meshStandardMaterial
          map={colorMap}
          bumpScale={0.1}
          metalness={0.1}
          roughness={1}
        />
      </Sphere>
      {
				coordinates.map((item) =>
					<MissionPoint key={item.id} lat={item.lat} lon={item.lon} identifier={item.identifier}/>
				)
			}

      {/* <mesh
        position={[0, -1.5, 0]}
        onClick={quake}
      >
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial color={isQuaking ? 'red' : 'green'} />
      </mesh> */}
    </group>
  );
}
