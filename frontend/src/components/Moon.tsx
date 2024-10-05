import { useRef } from "react";
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

export default function Moon() {
	const mesh = useRef<THREE.Mesh>(null!);
	const [colorMap, bumpMap] = useTexture([
		'/textures/moon/moonColorMap.jpg',
		'/textures/moon/moonDisplacementMap.jpg',
	]);

	useFrame(() => {
		mesh.current.rotation.y += 0.002;
		mesh.current.rotation.x += 0.0001;
	});

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
		</>
	)
}
