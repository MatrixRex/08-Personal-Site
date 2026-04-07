import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

export default function Model() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Central Core - High energy pulse */}
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={10} 
            toneMapped={false} 
          />
        </mesh>
        
        {/* Outer Mecha Plates - Code Geass / Gundam style sharp panels */}
        {[0, 1, 2, 3].map((i) => (
          <group 
            key={i} 
            rotation={[0, (i * Math.PI) / 2, 0]}
            position={[0, 0, 0]}
          >
            <mesh position={[0.6, 0, 0]}>
              <boxGeometry args={[0.15, 1.4, 0.9]} />
              <meshStandardMaterial color="#37474F" roughness={0.3} metalness={0.8} />
              
              {/* Highlight panel lines */}
              <mesh position={[0.08, 0, 0]}>
                <boxGeometry args={[0.01, 1.41, 0.1]} />
                <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={5} />
              </mesh>
            </mesh>
          </group>
        ))}
        
        {/* Bottom Stabilizers */}
        {[0, 1, 2, 3].map((i) => (
          <mesh 
            key={`base-${i}`}
            position={[Math.cos(i * Math.PI/2) * 0.4, -0.8, Math.sin(i * Math.PI/2) * 0.4]}
            rotation={[Math.PI/4, i * Math.PI/2, 0]}
          >
            <boxGeometry args={[0.2, 0.4, 0.1]} />
            <meshStandardMaterial color="#37474F" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
