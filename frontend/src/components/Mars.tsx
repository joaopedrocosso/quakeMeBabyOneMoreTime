'use client'
import { useTexture, Sphere, Text, Billboard, useGLTF, SpotLight } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useState } from 'react';

export default function Mars() {
  const marsRef = useRef<THREE.Mesh>(null);
  const colorMap = useTexture('/textures/mars/marsColorMap.jpg');
  const [isQuaking, setIsQuaking] = useState(false); 

  const latLongToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180); 

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  };


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

  const insightCoordinates = { lat: 4.502384, lon: 135.623447 };
  const other = { lat: 25, lon: -213 };
  const radius = 1.05;

  const insightPosition = latLongToVector3(insightCoordinates.lat, insightCoordinates.lon, radius);
  const elysiumMonsPosition = latLongToVector3(other.lat, other.lon, radius);

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

      <mesh position={[insightPosition.x, insightPosition.y, insightPosition.z]}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <Billboard
        position={[
          insightPosition.x,
          insightPosition.y + 0.06,
          insightPosition.z
        ]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          fontSize={0.04}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          InSight
        </Text>
      </Billboard>

      <mesh position={[elysiumMonsPosition.x, elysiumMonsPosition.y, elysiumMonsPosition.z]}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <Billboard
        position={[
          elysiumMonsPosition.x,
          elysiumMonsPosition.y + 0.06,
          elysiumMonsPosition.z
        ]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          fontSize={0.04}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Elysium Mons
        </Text>
      </Billboard>

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
