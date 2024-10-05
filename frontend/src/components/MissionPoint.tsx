import * as THREE from 'three'
import { Billboard, Text } from "@react-three/drei";

interface Props {
  lat: number;
  lon: number;
  identifier: string;
};

export default function MissionPoint({lat, lon, identifier}: Props) {
  const latLongToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180); 

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  };

  const position = latLongToVector3(lat, lon, 1.05);

  return (
		<>
			<mesh position={[position.x, position.y, position.z]}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color="#011221" />
      </mesh>

      <Billboard
        position={[
          position.x,
          position.y + 0.06,
          position.z
        ]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          fontSize={0.04}
          color="#011221"
          anchorX="center"
          anchorY="middle"
        >
          {identifier}
        </Text>
      </Billboard>
		</>
  )
}
