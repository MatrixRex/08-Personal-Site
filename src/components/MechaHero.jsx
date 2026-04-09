import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { LevaPanel, useControls, button, useCreateStore } from 'leva';
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

export default function MechaHero() {
  // Scene Tweak Settings - Only active in development
  const isDev = import.meta.env.DEV;
  const controlsRef = useRef(null);
  const levaStore = useCreateStore();

  const copyJson = async (label, payload) => {
    const text = JSON.stringify(payload, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      console.info(`${label} copied to clipboard`);
    } catch {
      window.prompt(`Copy ${label}:`, text);
    }
  };

  const getLiveCameraSettings = () => {
    const controls = controlsRef.current;
    const camera = controls?.object;
    const target = controls?.target;
    if (!camera || !target) {
      return {
        cameraPos,
        cameraTarget,
        cameraFov
      };
    }

    return {
      cameraPos: [
        Number(camera.position.x.toFixed(3)),
        Number(camera.position.y.toFixed(3)),
        Number(camera.position.z.toFixed(3))
      ],
      cameraTarget: [
        Number(target.x.toFixed(3)),
        Number(target.y.toFixed(3)),
        Number(target.z.toFixed(3))
      ],
      cameraFov: Number(camera.fov.toFixed(3))
    };
  };
  
  const { cameraPos, cameraTarget, cameraFov } = useControls('Camera', {
    cameraPos: { value: [6.219, 9.692, 6.466], step: 0.1 },
    cameraTarget: { value: [-0.847, 0.673, -0.63], step: 0.1 },
    cameraFov: { value: 45, min: 10, max: 120 },
    copyCameraSettings: button(() => {
      const controls = controlsRef.current;
      const camera = controls?.object;
      const target = controls?.target;

      if (!camera || !target) return;

      copyJson('camera settings', {
        cameraPos: [
          Number(camera.position.x.toFixed(3)),
          Number(camera.position.y.toFixed(3)),
          Number(camera.position.z.toFixed(3))
        ],
        cameraTarget: [
          Number(target.x.toFixed(3)),
          Number(target.y.toFixed(3)),
          Number(target.z.toFixed(3))
        ],
        cameraFov: Number(camera.fov.toFixed(3))
      });
    }, { label: 'Copy Camera Settings' })
  }, { hidden: !isDev }, { store: levaStore });

  const { modelPosition, modelRotation, modelScale } = useControls('Model Transform', {
    modelPosition: { value: [0, 0, 0], step: 0.1 },
    modelRotation: { value: [0, 0, 0], step: 0.05 },
    modelScale: { value: 1, min: 0.1, max: 10, step: 0.1 },
    copyModelSettings: button(() => {
      copyJson('model settings', {
        modelPosition,
        modelRotation,
        modelScale
      });
    }, { label: 'Copy Model Settings' })
  }, { hidden: !isDev }, { store: levaStore });

  const { ambientIntensity, pointIntensity, pointPos, pointColor } = useControls('Lights', {
    ambientIntensity: { value: 1.5, min: 0, max: 10 },
    pointIntensity: { value: 2, min: 0, max: 20 },
    pointPos: { value: [10, 10, 10] },
    pointColor: '#00e5ff',
    copyLightSettings: button(() => {
      copyJson('light settings', {
        ambientIntensity,
        pointIntensity,
        pointPos,
        pointColor
      });
    }, { label: 'Copy Light Settings' })
  }, { hidden: !isDev }, { store: levaStore });

  const { preset, blur, intensity } = useControls('Environment', {
    preset: { 
      value: 'park', 
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'] 
    },
    blur: { value: 0.8, min: 0, max: 1 },
    intensity: { value: 1, min: 0, max: 5 },
    copyEnvironmentSettings: button(() => {
      copyJson('environment settings', {
        preset,
        blur,
        intensity
      });
    }, { label: 'Copy Environment Settings' })
  }, { hidden: !isDev }, { store: levaStore });

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
    floorVisible: { value: true },
    floorSize: { value: 22.5, min: 1, max: 60, step: 0.5 },
    floorY: { value: -2.6, min: -10, max: 10, step: 0.05 },
    floorColor: '#eaf4ff',
    floorOpacity: { value: 1, min: 0, max: 1, step: 0.01 },
    floorBlur: { value: 2, min: 0, max: 12, step: 0.1 },
    floorFar: { value: 10, min: 1, max: 50, step: 0.5 },
    floorResolution: { value: 256, min: 64, max: 2048, step: 64 },
    copyFloorSettings: button(() => {
      copyJson('floor settings', {
        floorVisible,
        floorSize,
        floorY,
        floorColor,
        floorOpacity,
        floorBlur,
        floorFar,
        floorResolution
      });
    }, { label: 'Copy Floor Settings' })
  }, { hidden: !isDev }, { store: levaStore });

  const postProcess = useControls('Post-Processing', {
    bloom: { value: true },
    bloomIntensity: { value: 1.5, min: 0, max: 10, label: 'Bloom Intensity' },
    bloomRadius: { value: 0.4, min: 0, max: 1, step: 0.01 },
    bloomThreshold: { value: 1, min: 0, max: 2, step: 0.01 },

    brightnessContrast: { value: false },
    brightness: { value: 0, min: -1, max: 1, step: 0.01 },
    contrast: { value: 0, min: -1, max: 1, step: 0.01 },

    chromaticAberration: { value: false },
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

    noise: { value: true },
    noiseOpacity: { value: 0.05, min: 0, max: 0.2 },

    scanline: { value: false },
    scanlineDensity: { value: 1.25, min: 0.1, max: 3, step: 0.05 },
    scanlineOpacity: { value: 0.15, min: 0, max: 1, step: 0.01 },

    sepia: { value: false },
    sepiaAmount: { value: 0.4, min: 0, max: 1, step: 0.01 },

    vignette: { value: true },
    vignetteOffset: { value: 0.1, min: 0, max: 1, step: 0.01 },
    vignetteDarkness: { value: 1.1, min: 0, max: 2, step: 0.01 },

    hue: { value: 0, min: -Math.PI, max: Math.PI },

    copyPostProcessingSettings: button(() => {
      copyJson('post-processing settings', postProcess);
    }, { label: 'Copy Post-Processing Settings' })
  }, { hidden: !isDev }, { store: levaStore });

  useControls('Scene Tools', {
    copyAllSceneSettings: button(() => {
      copyJson('all scene settings', {
        camera: getLiveCameraSettings(),
        model: {
          modelPosition,
          modelRotation,
          modelScale
        },
        lights: {
          ambientIntensity,
          pointIntensity,
          pointPos,
          pointColor
        },
        environment: {
          preset,
          blur,
          intensity
        },
        floor: {
          floorVisible,
          floorSize,
          floorY,
          floorColor,
          floorOpacity,
          floorBlur,
          floorFar,
          floorResolution
        },
        postProcessing: postProcess
      });
    }, { label: 'Copy All Scene Settings' })
  }, { hidden: !isDev }, { store: levaStore });

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(to bottom, #E1F5FE, #FAFAFA)' }}>
      {isDev && <LevaPanel store={levaStore} flat titleBar />}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={cameraPos} fov={cameraFov} />
        
        <ambientLight intensity={ambientIntensity} />
        <pointLight position={pointPos} intensity={pointIntensity} color={pointColor} castShadow />
        
        <Suspense fallback={null}>
          <group
            name="Mecha Group"
            position={modelPosition}
            rotation={modelRotation}
            scale={modelScale}
          >
            <Model />
          </group>
          
          <Environment preset={preset} blur={blur} intensity={intensity} />
        </Suspense>

        {floorVisible && (
          <ContactShadows
            position={[0, floorY, 0]}
            opacity={floorOpacity}
            scale={floorSize}
            blur={floorBlur}
            far={floorFar}
            resolution={floorResolution}
            color={floorColor}
          />
        )}
        
        <OrbitControls
          ref={controlsRef}
          target={cameraTarget}
          autoRotate={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
          panSpeed={0.9}
          zoomSpeed={0.9}
          enableRotate
          enablePan
          enableZoom
          screenSpacePanning
        />
      </Canvas>
    </div>
  );
}

