import { useRef } from "react";
import * as THREE from 'three'
import { Billboard, OrbitControls, useTexture, Text } from "@react-three/drei";

export default function Moon() {
	const mesh = useRef<THREE.Mesh>(null!);
	const [colorMap, bumpMap] = useTexture([
		'/textures/moon/moonColorMap.jpg',
		'/textures/moon/moonDisplacementMap.jpg',
	]);

	const latLongToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180); 

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  };

	const apollo12Coordinates = { lat: -3.1975, lon: -23.3856 };
	const apollo15Coordinates = { lat: 26.1008, lon: 3.6527 };
	const apollo16Coordinates = { lat: -8.9913, lon: 15.5144 };
  const radius = 1.05;

  const apollo12Position = latLongToVector3(apollo12Coordinates.lat, apollo12Coordinates.lon, radius);
	const apollo15Position = latLongToVector3(apollo15Coordinates.lat, apollo15Coordinates.lon, radius);
	const apollo16Position = latLongToVector3(apollo16Coordinates.lat, apollo16Coordinates.lon, radius);


	return (
		<>
			<mesh ref={mesh}>
				<sphereGeometry args={[1, 64, 64]} />
				<meshPhongMaterial
					color="0xffffff"
					map={colorMap}
					displacementMap={bumpMap}
					displacementScale={0.06}
					bumpMap={bumpMap}
					bumpScale={0.04}
					reflectivity={0.2}
					shininess={0} />
				<OrbitControls enableZoom={false} enableRotate={true} rotateSpeed={0.2} />
			</mesh>

			<mesh position={[apollo12Position.x, apollo12Position.y, apollo12Position.z]}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color="#011221" />
      </mesh>

      <Billboard
        position={[
          apollo12Position.x,
          apollo12Position.y + 0.06,
          apollo12Position.z
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
          Apollo 12
        </Text>
      </Billboard>

			<mesh position={[apollo15Position.x, apollo15Position.y, apollo15Position.z]}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color="#011221" />
      </mesh>

      <Billboard
        position={[
          apollo15Position.x,
          apollo15Position.y + 0.06,
          apollo15Position.z
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
          Apollo 15
        </Text>
      </Billboard>

			<mesh position={[apollo16Position.x, apollo16Position.y, apollo16Position.z]}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color="#011221" />
      </mesh>

      <Billboard
        position={[
          apollo16Position.x,
          apollo16Position.y + 0.06,
          apollo16Position.z
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
          Apollo 16
        </Text>
      </Billboard>
		</>
	)
}
