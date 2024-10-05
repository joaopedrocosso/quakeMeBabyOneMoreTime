import { useRef } from "react";
import * as THREE from "three"
import MissionPoint from "@/components/MissionPoint"
import { OrbitControls, useTexture } from "@react-three/drei";

export default function Moon() {
	const mesh = useRef<THREE.Mesh>(null!);
	const [colorMap, bumpMap] = useTexture([
		"/textures/moon/moonColorMap.jpg",
		"/textures/moon/moonDisplacementMap.jpg",
	]);

	const apolloCoordinates = [
		{ lat: -3.1975, lon: -23.3856, identifier: "Apollo 12", id: 12},
		{ lat: 26.1008, lon: 3.6527, identifier: "Apollo 15", id: 15},
		{ lat: -8.9913, lon: 15.5144, identifier: "Apollo 16", id: 16}
	]
  
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
			{
				apolloCoordinates.map((item) =>
					<MissionPoint key={item.id} lat={item.lat} lon={item.lon} identifier={item.identifier}/>
				)
			}
		</>
	)
}
