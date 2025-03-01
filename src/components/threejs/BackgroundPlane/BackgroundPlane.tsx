'use client'

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { Mesh, ShaderMaterial, Color, GLSL3, Vector2 } from 'three';
import { GUI } from 'dat.gui';

import vertexShader from './Shader/vertex.glsl'
import fragmentShader from './Shader/fragment.glsl'
import fragmentPerlinShader from './Shader/perlin_noise_fragment.glsl'

interface BackgroundPlaneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color1?: string;
  color2?: string;
  // color3?: string;
  width?: number;
  height?: number;
  widthSegments?: number;
  heightSegments?: number;
}

const BackgroundPlane: React.FC<BackgroundPlaneProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color1 = '#7F7F7F',
  color2 = '#4D4D4D',
  // color3 = '#00FFBF', // Green
  width = 2,
  height = 2,
  widthSegments = 150,
  heightSegments = 150,
}) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const viewport = useThree(state => state.viewport);

  const color1Obj = useMemo(() => new Color(color1), [color1]);
  const color2Obj = useMemo(() => new Color(color2), [color2]);
  // const color3Obj = useMemo(() => new Color(color3), [color3]);

  const [guiValues] = useState({
    uWavesElevation: 0.2,
    uWavesFrequency: new Vector2(4, 1.5),
    uWavesSpeed: 0.75,
    uColor1: color1,
    uColor2: color2,
    // uColor3: color3,
    uColorOffset: 0.08,
    uColorMultiplier: 5,
  });

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentPerlinShader,
      uniforms: {
        uTime: { value: 0 },
        uWavesElevation: { value: guiValues.uWavesElevation },
        uWavesFrequency: { value: guiValues.uWavesFrequency },
        uWavesSpeed: { value: guiValues.uWavesSpeed },
        uColor1: { value: color1Obj },
        uColor2: { value: color2Obj },
        // uColor3: { value: color3Obj },
        uColorOffset: { value: guiValues.uColorOffset },
        uColorMultiplier: { value: guiValues.uColorMultiplier },
        uResolution: {
          value: new Vector2(
            window.innerWidth,
            window.innerHeight
          )
        }
      }
    });
  }, [color1Obj, color2Obj, guiValues]);

  useFrame((state, delta) => {
    if (shaderMaterial.uniforms) {
      shaderMaterial.uniforms.uTime.value += delta;
    }
  });

  // DEBUG
  useEffect(() => {
    const gui = new GUI({ width: 300 })

    gui.add(guiValues, 'uWavesElevation', 0, 1, 0.001).name('Waves Elevation').onChange((value) => {
      if (shaderMaterial.uniforms) {
        shaderMaterial.uniforms.uWavesElevation.value = value;
      }
    });

    gui.add(guiValues.uWavesFrequency, 'x', 0, 10, 0.001).name('Waves Frequency x').onChange((value) => {
      if (shaderMaterial.uniforms) {
        shaderMaterial.uniforms.uWavesFrequency.value.x = value;
      }
    });

    gui.add(guiValues.uWavesFrequency, 'y', 0, 10, 0.001).name('Waves Frequency y').onChange((value) => {
      if (shaderMaterial.uniforms) {
        shaderMaterial.uniforms.uWavesFrequency.value.y = value;
      }
    });

    gui.add(guiValues, 'uWavesSpeed', 0, 4, 0.001).name('Waves Speed').onChange((value) => {
      if (shaderMaterial.uniforms) {
        shaderMaterial.uniforms.uWavesSpeed.value = value;
      }
    });

    gui.addColor(guiValues, 'uColor1').name('Color 1').onChange((value) => {
      if (shaderMaterial.uniforms) {
        shaderMaterial.uniforms.uColor1.value = new Color(value);
      }
    });

    gui.addColor(guiValues, 'uColor2').name('Color 2').onChange((value) => {
      if (shaderMaterial.uniforms) {
        shaderMaterial.uniforms.uColor2.value = new Color(value);
      }
    });

    gui.add(guiValues, 'uColorOffset', 0, 1, 0.001).name('Color Offset').onChange((value) => {
      if (shaderMaterial.uniforms) {
        shaderMaterial.uniforms.uColorOffset.value = value;
      }
    });

    gui.add(guiValues, 'uColorMultiplier', 0, 10, 0.001).name('Color Multiplier').onChange((value) => {
      if (shaderMaterial.uniforms) {
        shaderMaterial.uniforms.uColorMultiplier.value = value;
      }
    });

    return () => {
      gui.destroy();
    };
  }, [shaderMaterial]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[width, height, widthSegments, heightSegments]} />
      <primitive object={shaderMaterial} attach="material" ref={materialRef} />
    </mesh>
  );
};

export default BackgroundPlane;
