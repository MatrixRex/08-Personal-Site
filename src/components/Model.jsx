import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Float, useGLTF, useAnimations } from '@react-three/drei';

const MODEL_PATH = `${import.meta.env.BASE_URL}models/welcome.glb`;

function CustomMecha({ envMapIntensity = 1 }) {
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

  // Apply environment intensity immediately to all mesh materials
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Keep a backup of the original materials or just override directly
          child.material.envMapIntensity = envMapIntensity;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [scene, envMapIntensity]);

  return <primitive ref={group} object={scene} scale={1.5} />;
}

export default function Model({ envMapIntensity = 1 }) {
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
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <group ref={meshRef}>
        <Suspense fallback={null}>
          {hasCustomModel ? (
            <CustomMecha envMapIntensity={envMapIntensity} />
          ) : null}
        </Suspense>
      </group>
    </Float>
  );
}

