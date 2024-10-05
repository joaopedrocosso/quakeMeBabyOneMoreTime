import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"
import MissionPoint from "@/components/MissionPoint"
import { useTexture } from "@react-three/drei";

interface Props {
  isPositionSphereCenter: boolean
};

export default function Moon({isPositionSphereCenter}: Props) {
	const mesh = useRef<THREE.Mesh>(null!);
	const [colorMap, bumpMap] = useTexture([
		"/textures/moon/moonColorMap.jpg",
		"/textures/moon/moonDisplacementMap.jpg",
	]);

	useFrame(() => {
		mesh.current.rotation.y += 0.002;
		mesh.current.rotation.x += 0.0001;
	});

	const apolloCoordinates = [
		{ lat: -3.1975, lon: -23.3856, identifier: "Apollo 12", id: 12},
		{ lat: 26.1008, lon: 3.6527, identifier: "Apollo 15", id: 15},
		{ lat: -8.9913, lon: 15.5144, identifier: "Apollo 16", id: 16}
	]


  
	return (
		<>
			<mesh ref={mesh} position={isPositionSphereCenter ? [0, 0, 0] : [1.9, 0, 0]}>
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
			</mesh>
			{
				apolloCoordinates.map((item) =>
					<MissionPoint key={item.id} lat={item.lat} lon={item.lon} identifier={item.identifier}/>
				)
			}
		</>
	)
}
