import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';

import {
  EffectComposer,
  Bloom,
  BrightnessContrast,
  ChromaticAberration,
  DepthOfField,
  DotScreen,
  Glitch,
  Grid,
  HueSaturation,
  Noise,
  Scanline,
  Sepia,
  Vignette
} from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
import Model from './Model';

function MouseRig({ mouseX, mouseY, groupRef, baseRotation }) {
  const baseQ = new THREE.Quaternion();
  const cameraRight = new THREE.Vector3();
  const worldUp = new THREE.Vector3(0, 1, 0);
  
  // Pre-allocate to avoid GC in useFrame
  const qY = new THREE.Quaternion();
  const qX = new THREE.Quaternion();

  useFrame((state) => {
    if (!mouseX || !mouseY || !groupRef.current) return;
    
    const x = mouseX.get() || 0;
    const y = mouseY.get() || 0;
    
    // 1. Extract camera axis for tilt (relative to screen)
    state.camera.matrixWorld.extractBasis(cameraRight, new THREE.Vector3(), new THREE.Vector3());
    
    // 2. Set base rotation from controls
    baseQ.setFromEuler(new THREE.Euler(baseRotation[0], baseRotation[1], baseRotation[2]));
    
    // 3. Hybrid logic: 
    // Left/Right (x) -> Rotate around world vertical axis (consistent)
    // Up/Down (y) -> Rotate around camera right axis (tilted relative to viewer)
    qY.setFromAxisAngle(worldUp, -x * 0.003);
    qX.setFromAxisAngle(cameraRight, -y * 0.005);
    
    // 4. Apply
    groupRef.current.quaternion.copy(baseQ).premultiply(qY).premultiply(qX);
  });
  return null;
}

export default function MechaHero({ mouseX, mouseY, isMobile }) {
    const cameraPos = [4.581, 4.274, 4.25];
  const cameraTarget = [-0.826, 0.753, -0.665];
  const cameraFov = 45;

  const modelPosition = [0, 0.5, 0];
  const modelRotation = [0, 0, 0];
  const modelScale = 1;

  const ambientIntensity = 0.1;
  const pointIntensity = 1.3;
  const pointPos = [-2.6, 3.5, -3.4];
  const pointColor = '#64339c';

  const preset = 'night';
  const blur = 0;
  const intensity = 0.2;
  const envRotation = 1.46;
  const envBackground = false;

  const floorVisible = false;
  const floorSize = 22.5;
  const floorY = -2.6;
  const floorColor = '#eaf4ff';
  const floorOpacity = 1;
  const floorBlur = 2;
  const floorFar = 10;
  const floorResolution = 256;

  const postProcess = {
    bloom: true,
    bloomIntensity: 6.5,
    bloomRadius: 0.33,
    bloomThreshold: 0.03,
    brightnessContrast: true,
    brightness: 0,
    contrast: 0.05,
    chromaticAberration: true,
    chromaOffsetX: 0.001,
    chromaOffsetY: 0.001,
    depthOfField: false,
    focusDistance: 0.02,
    focalLength: 0.02,
    bokehScale: 2,
    dotScreen: false,
    dotAngle: 1.57,
    dotScale: 1,
    glitch: false,
    glitchDelayMin: 1.5,
    glitchDelayMax: 3.5,
    glitchDurationMin: 0.2,
    glitchDurationMax: 0.6,
    glitchStrengthMin: 0.02,
    glitchStrengthMax: 0.1,
    glitchMode: 'sporadic',
    grid: false,
    gridScale: 1.5,
    gridLineWidth: 0.05,
    noise: false,
    noiseOpacity: 0.05,
    scanline: true,
    scanlineDensity: 1.4,
    scanlineOpacity: 0.25,
    sepia: false,
    sepiaAmount: 0.4,
    vignette: false,
    vignetteOffset: 0.1,
    vignetteDarkness: 1.1,
    hue: 0
  };
  const controlsRef = useRef(null);
  const modelGroupRef = useRef(null);

  return (
    <div className="mecha-hero-container">
      <Canvas 
        shadows={{ type: THREE.PCFShadowMap }} 
        gl={{ antialias: false, stencil: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <PerspectiveCamera makeDefault position={cameraPos} fov={cameraFov} />
        {!isMobile && <MouseRig mouseX={mouseX} mouseY={mouseY} groupRef={modelGroupRef} baseRotation={modelRotation} />}

        <ambientLight intensity={ambientIntensity} args={[null, 11.92]} castShadow={false} />
        <pointLight position={pointPos} intensity={pointIntensity} color={pointColor} castShadow />

        <Suspense fallback={null}>
          <group
            ref={modelGroupRef}
            name="Mecha Group"
            position={modelPosition}
            scale={modelScale}
          >
            <Model envMapIntensity={intensity} />
          </group>

          <Environment
            preset={preset}
            background={envBackground}
            backgroundBlurriness={blur}
            environmentIntensity={intensity}
            environmentRotation={[0, envRotation, 0]}
          />
        </Suspense>

        {floorVisible && (
          <ContactShadows
            position={0}
            opacity={floorOpacity}
            scale={floorSize}
            blur={floorBlur}
            far={floorFar}
            resolution={floorResolution}
            color={floorColor} castShadow={false}
          />
        )}

        <OrbitControls
          ref={controlsRef}
          target={cameraTarget}
          autoRotate={false}
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
          panSpeed={0.9}
          zoomSpeed={0.9}
          enableRotate={false}
          enablePan={false}
          enableZoom={false}
          screenSpacePanning
        />

        <EffectComposer multisampling={0}>
          {postProcess.bloom && (
            <Bloom 
              intensity={postProcess.bloomIntensity} 
              luminanceThreshold={postProcess.bloomThreshold} 
              radius={postProcess.bloomRadius}
              mipmapBlur 
            />
          )}
          {postProcess.brightnessContrast && (
            <BrightnessContrast 
              brightness={postProcess.brightness} 
              contrast={postProcess.contrast} 
            />
          )}
          {postProcess.chromaticAberration && (
            <ChromaticAberration 
              offset={[postProcess.chromaOffsetX, postProcess.chromaOffsetY]} 
            />
          )}
          {postProcess.depthOfField && (
            <DepthOfField 
              focusDistance={postProcess.focusDistance} 
              focalLength={postProcess.focalLength} 
              bokehScale={postProcess.bokehScale} 
            />
          )}
          {postProcess.dotScreen && (
            <DotScreen 
              angle={postProcess.dotAngle} 
              scale={postProcess.dotScale} 
            />
          )}
          {postProcess.glitch && (
            <Glitch 
              delay={[postProcess.glitchDelayMin, postProcess.glitchDelayMax]} 
              duration={[postProcess.glitchDurationMin, postProcess.glitchDurationMax]} 
              strength={[postProcess.glitchStrengthMin, postProcess.glitchStrengthMax]} 
              mode={GlitchMode[postProcess.glitchMode.toUpperCase()]}
            />
          )}
          {postProcess.grid && (
            <Grid 
              scale={postProcess.gridScale} 
              lineWidth={postProcess.gridLineWidth} 
            />
          )}
          {postProcess.noise && (
            <Noise 
              opacity={postProcess.noiseOpacity} 
              premultiply 
            />
          )}
          {postProcess.scanline && (
            <Scanline 
              density={postProcess.scanlineDensity} 
              opacity={postProcess.scanlineOpacity} 
            />
          )}
          {postProcess.sepia && (
            <Sepia 
              intensity={postProcess.sepiaAmount} 
            />
          )}
          {postProcess.vignette && (
            <Vignette 
              offset={postProcess.vignetteOffset} 
              darkness={postProcess.vignetteDarkness} 
            />
          )}
          <HueSaturation hue={postProcess.hue} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
