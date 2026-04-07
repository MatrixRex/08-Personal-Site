import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF, MeshDistortMaterial } from '@react-three/drei';

function CustomMecha() {
  const { scene } = useGLTF('/models/mecha_hero.glb');
  return <primitive object={scene} scale={1.5} />;
}

export default function Model() {
  const meshRef = useRef();
  const [hasCustomModel, setHasCustomModel] = useState(false);

  useEffect(() => {
    // We do a quick check to see if the file exists before attempting to load as a hook
    fetch('/models/mecha_hero.glb', { method: 'HEAD' })
      .then(res => {
        if (res.ok) setHasCustomModel(true);
      })
      .catch(() => setHasCustomModel(false));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        <Suspense fallback={<ProceduralMecha />}>
          {hasCustomModel ? (
            <CustomMecha />
          ) : (
            <ProceduralMecha />
          )}
        </Suspense>
      </group>
    </Float>
  );
}

function ProceduralMecha() {
  return (
    <>
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial 
          color="#00E5FF" 
          emissive="#00E5FF" 
          emissiveIntensity={10} 
          toneMapped={false} 
        />
      </mesh>
      
      {[0, 1, 2, 3].map((i) => (
        <group 
          key={i} 
          rotation={[0, (i * Math.PI) / 2, 0]}
        >
          <mesh position={[0.6, 0, 0]}>
            <boxGeometry args={[0.15, 1.4, 0.9]} />
            <meshStandardMaterial color="#37474F" roughness={0.3} metalness={0.8} />
            <mesh position={[0.08, 0, 0]}>
              <boxGeometry args={[0.01, 1.41, 0.1]} />
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={5} />
            </mesh>
          </mesh>
        </group>
      ))}
      
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
    </>
  );
}
