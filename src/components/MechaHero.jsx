import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
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

export default function MechaHero() {
  // Scene Tweak Settings - Only active in development
  const isDev = import.meta.env.DEV;
  const controlsRef = useRef(null);

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
    cameraPos: { value: [4.581, 4.274, 4.25], step: 0.1 },
    cameraTarget: { value: [-0.826, 0.753, -0.665], step: 0.1 },
    cameraFov: { value: 45, min: 10, max: 120 },
    copyCameraSettings: button(() => {
      // Direct access to the live three.js objects
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
  }, { hidden: !isDev });

  const { modelPosition, modelRotation, modelScale } = useControls('Model Transform', {
    modelPosition: { value: [0, 0, 0], step: 0.1 },
    modelRotation: { value: [0, 0, 0], step: 0.05 },
    modelScale: { value: 1, min: 0.1, max: 10, step: 0.1 },
    copyModelSettings: button((get) => {
      copyJson('model settings', {
        modelPosition: get('Model Transform.modelPosition'),
        modelRotation: get('Model Transform.modelRotation'),
        modelScale: get('Model Transform.modelScale')
      });
    }, { label: 'Copy Model Settings' })
  }, { hidden: !isDev });

  const { ambientIntensity, pointIntensity, pointPos, pointColor } = useControls('Lights', {
    ambientIntensity: { value: 0.1, min: 0, max: 10 },
    pointIntensity: { value: 1.3, min: 0, max: 20 },
    pointPos: { value: [-2.6, 3.5, -3.4] },
    pointColor: '#64339c',
    copyLightSettings: button((get) => {
      copyJson('light settings', {
        ambientIntensity: get('Lights.ambientIntensity'),
        pointIntensity: get('Lights.pointIntensity'),
        pointPos: get('Lights.pointPos'),
        pointColor: get('Lights.pointColor')
      });
    }, { label: 'Copy Light Settings' })
  }, { hidden: !isDev });

  const { preset, blur, intensity, envRotation, envBackground } = useControls('Environment', {
    preset: {
      value: 'night',
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby']
    },
    blur: { value: 0, min: 0, max: 1 },
    intensity: { value: 0.2, min: 0, max: 5 },
    envRotation: { value: 1.46, min: 0, max: Math.PI * 2, step: 0.01 },
    envBackground: { value: false },
    copyEnvironmentSettings: button((get) => {
      copyJson('environment settings', {
        preset: get('Environment.preset'),
        blur: get('Environment.blur'),
        intensity: get('Environment.intensity'),
        envRotation: get('Environment.envRotation'),
        envBackground: get('Environment.envBackground')
      });
    }, { label: 'Copy Environment Settings' })
  }, { hidden: !isDev });

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
    copyFloorSettings: button((get) => {
      copyJson('floor settings', {
        floorVisible: get('Floor.floorVisible'),
        floorSize: get('Floor.floorSize'),
        floorY: get('Floor.floorY'),
        floorColor: get('Floor.floorColor'),
        floorOpacity: get('Floor.floorOpacity'),
        floorBlur: get('Floor.floorBlur'),
        floorFar: get('Floor.floorFar'),
        floorResolution: get('Floor.floorResolution')
      });
    }, { label: 'Copy Floor Settings' })
  }, { hidden: !isDev });

  const postProcess = useControls('Post-Processing', {
    bloom: { value: true },
    bloomIntensity: { value: 6.5, min: 0, max: 10, label: 'Bloom Intensity' },
    bloomRadius: { value: 0.33, min: 0, max: 1, step: 0.01 },
    bloomThreshold: { value: 0.03, min: 0, max: 2, step: 0.01 },

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
    scanlineDensity: { value: 1.4, min: 0.1, max: 3, step: 0.05 },
    scanlineOpacity: { value: 0.25, min: 0, max: 1, step: 0.01 },

    sepia: { value: false },
    sepiaAmount: { value: 0.4, min: 0, max: 1, step: 0.01 },

    vignette: { value: false },
    vignetteOffset: { value: 0.1, min: 0, max: 1, step: 0.01 },
    vignetteDarkness: { value: 1.1, min: 0, max: 2, step: 0.01 },

    hue: { value: 0, min: -Math.PI, max: Math.PI },

    copyPostProcessingSettings: button((get) => {
      // Get all values from the Post-Processing folder
      const keys = [
        'bloom', 'bloomIntensity', 'bloomRadius', 'bloomThreshold',
        'brightnessContrast', 'brightness', 'contrast',
        'chromaticAberration', 'chromaOffsetX', 'chromaOffsetY',
        'depthOfField', 'focusDistance', 'focalLength', 'bokehScale',
        'dotScreen', 'dotAngle', 'dotScale',
        'glitch', 'glitchDelayMin', 'glitchDelayMax', 'glitchDurationMin', 'glitchDurationMax', 'glitchStrengthMin', 'glitchStrengthMax', 'glitchMode',
        'grid', 'gridScale', 'gridLineWidth',
        'noise', 'noiseOpacity',
        'scanline', 'scanlineDensity', 'scanlineOpacity',
        'sepia', 'sepiaAmount',
        'vignette', 'vignetteOffset', 'vignetteDarkness', 'hue'
      ];
      const settings = {};
      keys.forEach(k => settings[k] = get(`Post-Processing.${k}`));
      copyJson('post-processing settings', settings);
    }, { label: 'Copy Post-Processing Settings' })
  }, { hidden: !isDev });

  useControls('Scene Tools', {
    copyAllSceneSettings: button((get) => {
      // Manually pull every folder's state using the get() helper
      const settings = {
        camera: {
          cameraPos: get('Camera.cameraPos'),
          cameraTarget: get('Camera.cameraTarget'),
          cameraFov: get('Camera.cameraFov')
        },
        model: {
          modelPosition: get('Model Transform.modelPosition'),
          modelRotation: get('Model Transform.modelRotation'),
          modelScale: get('Model Transform.modelScale')
        },
        lights: {
          ambientIntensity: get('Lights.ambientIntensity'),
          pointIntensity: get('Lights.pointIntensity'),
          pointPos: get('Lights.pointPos'),
          pointColor: get('Lights.pointColor')
        },
        environment: {
          preset: get('Environment.preset'),
          blur: get('Environment.blur'),
          intensity: get('Environment.intensity'),
          envRotation: get('Environment.envRotation'),
          envBackground: get('Environment.envBackground')
        },
        floor: {
          floorVisible: get('Floor.floorVisible'),
          floorSize: get('Floor.floorSize'),
          floorY: get('Floor.floorY'),
          floorColor: get('Floor.floorColor'),
          floorOpacity: get('Floor.floorOpacity'),
          floorBlur: get('Floor.floorBlur'),
          floorFar: get('Floor.floorFar'),
          floorResolution: get('Floor.floorResolution')
        },
        postProcessing: {
          bloom: get('Post-Processing.bloom'),
          bloomIntensity: get('Post-Processing.bloomIntensity'),
          bloomRadius: get('Post-Processing.bloomRadius'),
          bloomThreshold: get('Post-Processing.bloomThreshold'),
          brightnessContrast: get('Post-Processing.brightnessContrast'),
          brightness: get('Post-Processing.brightness'),
          contrast: get('Post-Processing.contrast'),
          chromaticAberration: get('Post-Processing.chromaticAberration'),
          chromaOffsetX: get('Post-Processing.chromaOffsetX'),
          chromaOffsetY: get('Post-Processing.chromaOffsetY'),
          depthOfField: get('Post-Processing.depthOfField'),
          focusDistance: get('Post-Processing.focusDistance'),
          focalLength: get('Post-Processing.focalLength'),
          bokehScale: get('Post-Processing.bokehScale'),
          dotScreen: get('Post-Processing.dotScreen'),
          dotAngle: get('Post-Processing.dotAngle'),
          dotScale: get('Post-Processing.dotScale'),
          glitch: get('Post-Processing.glitch'),
          glitchDelayMin: get('Post-Processing.glitchDelayMin'),
          glitchDelayMax: get('Post-Processing.glitchDelayMax'),
          glitchDurationMin: get('Post-Processing.glitchDurationMin'),
          glitchDurationMax: get('Post-Processing.glitchDurationMax'),
          glitchStrengthMin: get('Post-Processing.glitchStrengthMin'),
          glitchStrengthMax: get('Post-Processing.glitchStrengthMax'),
          glitchMode: get('Post-Processing.glitchMode'),
          grid: get('Post-Processing.grid'),
          gridScale: get('Post-Processing.gridScale'),
          gridLineWidth: get('Post-Processing.gridLineWidth'),
          noise: get('Post-Processing.noise'),
          noiseOpacity: get('Post-Processing.noiseOpacity'),
          scanline: get('Post-Processing.scanline'),
          scanlineDensity: get('Post-Processing.scanlineDensity'),
          scanlineOpacity: get('Post-Processing.scanlineOpacity'),
          sepia: get('Post-Processing.sepia'),
          sepiaAmount: get('Post-Processing.sepiaAmount'),
          vignette: get('Post-Processing.vignette'),
          vignetteOffset: get('Post-Processing.vignetteOffset'),
          vignetteDarkness: get('Post-Processing.vignetteDarkness'),
          hue: get('Post-Processing.hue')
        }
      };
      copyJson('all scene settings', settings);
    }, { label: 'Copy All Scene Settings' })
  }, { hidden: !isDev });

  return (
    <div className="mecha-hero-container">
      <Canvas 
        shadows={{ type: THREE.PCFShadowMap }} 
        gl={{ antialias: false, stencil: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <PerspectiveCamera makeDefault position={cameraPos} fov={cameraFov} />

        <ambientLight intensity={ambientIntensity} args={[null, 11.92]} castShadow={false} />
        <pointLight position={pointPos} intensity={pointIntensity} color={pointColor} castShadow />

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

