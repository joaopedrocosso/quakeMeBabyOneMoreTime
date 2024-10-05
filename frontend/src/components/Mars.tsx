'use client'
import { useTexture, Sphere, Text, Billboard, useGLTF, SpotLight } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import MissionPoint from "@/components/MissionPoint"

export default function Mars() {
  const marsRef = useRef<THREE.Mesh>(null);
  const colorMap = useTexture('/textures/mars/marsColorMap.jpg');
  const [isQuaking, setIsQuaking] = useState(false); 

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
    <>
      <Sphere ref={marsRef} args={[1, 64, 64]} castShadow receiveShadow>
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
    </>
  );
}
