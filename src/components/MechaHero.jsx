import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { useControls, button } from 'leva';
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

const SceneSync = ({ target }) => {
  const { camera } = useThree();
  useEffect(() => {
    if (camera && target) {
      camera.lookAt(...target);
    }
  }, [camera, target]);
  return null;
};

export default function MechaHero() {
  // Scene Tweak Settings - Only active in development
  const isDev = import.meta.env.DEV;
  console.log('MechaHero Rendering', { isDev });

  const settingsRef = useRef({});

  const copyJson = async (label, payload) => {
    const text = JSON.stringify(payload, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      console.info(`${label} copied to clipboard`);
    } catch {
      window.prompt(`Copy ${label}:`, text);
    }
  };

  const { cameraPos, cameraTarget, cameraFov } = useControls('Camera', {
    cameraPos: { value: [0, 0, 10], step: 0.1 },
    cameraTarget: { value: [0, 0, 0], step: 0.1 },
    cameraFov: { value: 45, min: 10, max: 120 },
    copyCameraSettings: button(() => {
      copyJson('camera settings', settingsRef.current.camera);
    }, { label: 'Copy Camera Settings' })
  }, { hidden: !isDev, collapsed: true });

  const { modelPosition, modelRotation, modelScale } = useControls('Model Transform', {
    modelPosition: { value: [0, 0, 0], step: 0.1 },
    modelRotation: { value: [0, 0, 0], step: 0.05 },
    modelScale: { value: 1, min: 0.1, max: 10, step: 0.1 },
    copyModelSettings: button(() => {
      copyJson('model settings', settingsRef.current.model);
    }, { label: 'Copy Model Settings' })
  }, { hidden: !isDev, collapsed: true });

  const { ambientIntensity, pointIntensity, pointPos, pointColor } = useControls('Lights', {
    ambientIntensity: { value: 0, min: 0, max: 2, step: 0.01 },
    pointIntensity: { value: 0.2, min: 0, max: 10, step: 0.1 },
    pointPos: { value: [-2.3, 2.7, -3.8] },
    pointColor: '#00e5ff',
    copyLightSettings: button(() => {
      copyJson('light settings', settingsRef.current.lights);
    }, { label: 'Copy Light Settings' })
  }, { hidden: !isDev, collapsed: true });

  const { preset, blur, intensity, envRotation, envBackground } = useControls('Environment', {
    preset: {
      value: 'night',
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby']
    },
    blur: { value: 0, min: 0, max: 1 },
    intensity: { value: 1.2, min: 0, max: 5 },
    envRotation: { value: 1.17, min: 0, max: Math.PI * 2, step: 0.01 },
    envBackground: { value: false },
    copyEnvironmentSettings: button(() => {
      copyJson('environment settings', settingsRef.current.environment);
    }, { label: 'Copy Environment Settings' })
  }, { hidden: !isDev, collapsed: true });

  const {
    floorVisible,
    floorSize,
    floorY,
    floorColor,
    floorOpacity,
    floorBlur,
    floorFar,
    floorResolution
  } = useControls('Floor', {
    floorVisible: { value: false },
    floorSize: { value: 22.5, min: 1, max: 60, step: 0.5 },
    floorY: { value: -2.6, min: -10, max: 10, step: 0.05 },
    floorColor: '#eaf4ff',
    floorOpacity: { value: 1, min: 0, max: 1, step: 0.01 },
    floorBlur: { value: 2, min: 0, max: 12, step: 0.1 },
    floorFar: { value: 10, min: 1, max: 50, step: 0.5 },
    floorResolution: { value: 256, min: 64, max: 2048, step: 64 },
    copyFloorSettings: button(() => {
      copyJson('floor settings', settingsRef.current.floor);
    }, { label: 'Copy Floor Settings' })
  }, { hidden: !isDev, collapsed: true });

  const postProcess = useControls('Post-Processing', {
    bloom: { value: true },
    bloomIntensity: { value: 2.7, min: 0, max: 10 },
    bloomRadius: { value: 0.4, min: 0, max: 1, step: 0.01 },
    bloomThreshold: { value: 0.37, min: 0, max: 2, step: 0.01 },

    brightnessContrast: { value: true },
    brightness: { value: 0, min: -1, max: 1, step: 0.01 },
    contrast: { value: 0.05, min: -1, max: 1, step: 0.01 },

    chromaticAberration: { value: true },
    chromaOffsetX: { value: 0.001, min: 0, max: 0.02, step: 0.0005 },
    chromaOffsetY: { value: 0.001, min: 0, max: 0.02, step: 0.0005 },

    depthOfField: { value: false },
    focusDistance: { value: 0.02, min: 0, max: 1, step: 0.001 },
    focalLength: { value: 0.02, min: 0, max: 1, step: 0.001 },
    bokehScale: { value: 2, min: 0, max: 20, step: 0.1 },

    dotScreen: { value: false },
    dotAngle: { value: 1.57, min: 0, max: Math.PI, step: 0.01 },
    dotScale: { value: 1, min: 0.1, max: 3, step: 0.05 },

    glitch: { value: false },
    glitchDelayMin: { value: 1.5, min: 0, max: 5, step: 0.1 },
    glitchDelayMax: { value: 3.5, min: 0, max: 8, step: 0.1 },
    glitchDurationMin: { value: 0.2, min: 0, max: 2, step: 0.05 },
    glitchDurationMax: { value: 0.6, min: 0, max: 3, step: 0.05 },
    glitchStrengthMin: { value: 0.02, min: 0, max: 1, step: 0.01 },
    glitchStrengthMax: { value: 0.1, min: 0, max: 1, step: 0.01 },
    glitchMode: { value: 'sporadic', options: ['sporadic', 'constant', 'disabled'] },

    grid: { value: false },
    gridScale: { value: 1.5, min: 0.1, max: 10, step: 0.1 },
    gridLineWidth: { value: 0.05, min: 0.01, max: 1, step: 0.01 },

    noise: { value: false },
    noiseOpacity: { value: 0.05, min: 0, max: 0.2 },

    scanline: { value: true },
    scanlineDensity: { value: 1.2, min: 0.1, max: 3, step: 0.05 },
    scanlineOpacity: { value: 0.15, min: 0, max: 1, step: 0.01 },

    sepia: { value: false },
    sepiaAmount: { value: 0.4, min: 0, max: 1, step: 0.01 },

    vignette: { value: false },
    vignetteOffset: { value: 0.1, min: 0, max: 1, step: 0.01 },
    vignetteDarkness: { value: 1.1, min: 0, max: 2, step: 0.01 },

    hue: { value: 0, min: -Math.PI, max: Math.PI },

    copyPostProcessingSettings: button(() => {
      copyJson('post-processing settings', settingsRef.current.postProcessing);
    }, { label: 'Copy Post-Processing Settings' })
  }, { hidden: !isDev, collapsed: true });

  // Update settingsRef every render with the latest values from all useControls calls
  settingsRef.current = {
    camera: { cameraPos, cameraTarget, cameraFov },
    model: { modelPosition, modelRotation, modelScale },
    lights: { ambientIntensity, pointIntensity, pointPos, pointColor },
    environment: { preset, blur, intensity, envRotation, envBackground },
    floor: { floorVisible, floorSize, floorY, floorColor, floorOpacity, floorBlur, floorFar, floorResolution },
    postProcessing: postProcess
  };

  useControls('Scene Tools', {
    copyAllSceneSettings: button(() => {
      copyJson('all scene settings', settingsRef.current);
    }, { label: 'Copy All Scene Settings' })
  }, { hidden: !isDev, collapsed: true });


  return (
    <div className="mecha-hero-container">
      <Canvas 
        shadows 
        gl={{ antialias: false, stencil: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <PerspectiveCamera makeDefault position={cameraPos} fov={cameraFov} />
        
        <ambientLight intensity={ambientIntensity} />
        <pointLight position={pointPos} intensity={pointIntensity} color={pointColor} castShadow decay={0} />

        <Suspense fallback={null}>
          <group
            name="Mecha Group"
            position={modelPosition}
            rotation={modelRotation}
            scale={modelScale} castShadow={true}
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

        <SceneSync target={cameraTarget} />

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

