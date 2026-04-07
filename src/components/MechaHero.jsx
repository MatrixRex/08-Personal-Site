import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { EffectComposer, Bloom, Noise, Vignette, HueSaturation } from '@react-three/postprocessing';
import Model from './Model';

export default function MechaHero() {
  // Scene Tweak Settings - Only active in development
  const isDev = import.meta.env.DEV;
  
  const { cameraPos, cameraFov } = useControls('Camera', {
    cameraPos: { value: [10, 15, 15], step: 0.1 },
    cameraFov: { value: 45, min: 10, max: 120 }
  }, { hidden: !isDev });

  const { ambientIntensity, pointIntensity, pointPos, pointColor } = useControls('Lights', {
    ambientIntensity: { value: 1.5, min: 0, max: 10 },
    pointIntensity: { value: 2, min: 0, max: 20 },
    pointPos: { value: [10, 10, 10] },
    pointColor: '#00E5FF'
  }, { hidden: !isDev });

  const { preset, blur, intensity } = useControls('Environment', {
    preset: { 
      value: 'park', 
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'] 
    },
    blur: { value: 0.8, min: 0, max: 1 },
    intensity: { value: 1, min: 0, max: 5 }
  }, { hidden: !isDev });

  const postProcess = useControls('Post-Processing', {
    bloom: { value: true },
    bloomIntensity: { value: 1.5, min: 0, max: 10, label: 'Bloom Intensity' },
    noise: { value: true },
    noiseOpacity: { value: 0.05, min: 0, max: 0.2 },
    vignette: { value: true },
    hue: { value: 0, min: -Math.PI, max: Math.PI }
  }, { hidden: !isDev });


  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(to bottom, #E1F5FE, #FAFAFA)' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={cameraPos} fov={cameraFov} />
        
        <ambientLight intensity={ambientIntensity} />
        <pointLight position={pointPos} intensity={pointIntensity} color={pointColor} castShadow />
        
        <Suspense fallback={null}>
          <group name="Mecha Group">
            <Model />
          </group>
          
          <Environment preset={preset} blur={blur} environmentIntensity={intensity} />
          
          <EffectComposer disableNormalPass>
            {postProcess.bloom && (
              <Bloom 
                luminanceThreshold={1} 
                mipmapBlur 
                intensity={postProcess.bloomIntensity} 
                radius={0.4} 
              />
            )}
            {postProcess.noise && <Noise opacity={postProcess.noiseOpacity} />}
            {postProcess.vignette && <Vignette eskil={false} offset={0.1} darkness={1.1} />}
            <HueSaturation hue={postProcess.hue} saturation={0} />
          </EffectComposer>
        </Suspense>

        <ContactShadows 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={10} 
          resolution={256} 
          color="#000000" 
        />
        
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}

