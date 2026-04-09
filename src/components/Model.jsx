import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Float, useGLTF, useAnimations } from '@react-three/drei';

const MODEL_PATH = '/models/model.glb';

function CustomMecha() {
  const group = useRef();
  const { scene, animations = [] } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations || [], group);

  useEffect(() => {
    // Play the first animation if it exists
    if (animations && animations.length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      if (firstAction) {
        firstAction.reset().fadeIn(0.5).play();
      }
    }
  }, [actions, animations]);

  return <primitive ref={group} object={scene} scale={1.5} />;
}

export default function Model() {
  const meshRef = useRef();
  const [hasCustomModel, setHasCustomModel] = useState(false);

  useEffect(() => {
    fetch(MODEL_PATH, { method: 'HEAD' })
      .then(res => {
        if (res.ok) setHasCustomModel(true);
      })
      .catch(() => setHasCustomModel(false));
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef}>
        <Suspense fallback={<PlaceholderCube />}>
          {hasCustomModel ? (
            <CustomMecha />
          ) : (
            <PlaceholderCube />
          )}
        </Suspense>
      </group>
    </Float>
  );
}


function PlaceholderCube() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1.5} />
    </mesh>
  );
}
