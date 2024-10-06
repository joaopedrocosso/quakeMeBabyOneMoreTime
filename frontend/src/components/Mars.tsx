'use client';
import { useTexture, Sphere, Text, Billboard } from '@react-three/drei';
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

  const insightCoordinates = { lat: 4.502384, lon: 135.623447 };
  const radius = 1.05;

  const insightPosition = latLongToVector3(insightCoordinates.lat, insightCoordinates.lon, radius);

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

      {/* Indicador de posição InSight */}
      <mesh position={[insightPosition.x, insightPosition.y, insightPosition.z]}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color="#20252B" />
      </mesh>

      {/* Adicionando a imagem PNG */}
      <Billboard
        position={[insightPosition.x, insightPosition.y + 0.06, insightPosition.z]} // Ajuste a altura
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}

      >
        <mesh>
          {/* Ajuste o tamanho do plano conforme a proporção da sua imagem */}
          <planeGeometry args={[0.340, 0.09649]} /> {/* Proporção de 148:42 */}
          <meshStandardMaterial 
            map={useTexture('/insight.png')} // Verifique a resolução da imagem
            transparent 
            opacity={1}
            side={THREE.DoubleSide} // Para melhorar a aparência
          />
        </mesh>
      </Billboard>

    </>
  );
}
