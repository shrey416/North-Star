// src/components/InteractiveStarMap.tsx
"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Text, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// A single star representing a skill or career
function StarNode({ position, name }: { position: [number, number, number], name: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    // Optional: add some subtle movement
    // meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial
          color="#06b6d4" // cyan-400
          emissive="#06b6d4"
          emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh>
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}

export function InteractiveStarMap() {
  // Placeholder data. This would come from your backend.
  const careerData = [
    { name: 'AI Engineer', position: [0, 0, 0] as [number, number, number] },
    { name: 'Python', position: [2, 1, -1] as [number, number, number] },
    { name: 'TensorFlow', position: [3, 2, -2] as [number, number, number] },
    { name: 'Cloud Architect', position: [-5, 2, 1] as [number, number, number] },
    { name: 'AWS', position: [-6, 3, 2] as [number, number, number] },
  ];

  return (
    <div className='w-full h-[600px] rounded-2xl border border-cyan-400/20 bg-black'>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {careerData.map(node => (
          <StarNode key={node.name} name={node.name} position={node.position} />
        ))}

        {/* This is where you would use GSAP or another library to draw lines
            between nodes to form constellations based on career path data. */}
            
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}