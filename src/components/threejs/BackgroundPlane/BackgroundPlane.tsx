'use client'

import React, { useRef, useMemo, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { Mesh, ShaderMaterial, Color, Vector2 } from 'three';
// import { GUI } from 'dat.gui';
import { useTheme } from 'next-themes'

// import vertexShader from './Shader/vertex.glsl'
// import fragmentShader from './Shader/fragment.glsl'
// import fragmentPerlinShader from './Shader/perlin_noise_fragment.glsl'

import lavaFragmentShader from './Shader/Lavalamp/fragment.glsl';
import lavaVertexShader from './Shader/Lavalamp/vertex.glsl';

const lerpColor = (color1 :any, color2: any, factor: any) => {
  const result = new Color();
  result.r = color1.r + (color2.r - color1.r) * factor;
  result.g = color1.g + (color2.g - color1.g) * factor;
  result.b = color1.b + (color2.b - color1.b) * factor;
  return result;
};

interface BackgroundPlaneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color1?: string;
  color2?: string;
  width?: number;
  height?: number;
  widthSegments?: number;
  heightSegments?: number;
}

const BackgroundPlane: React.FC<BackgroundPlaneProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color1 = '#fafaff',
  color2 = '#363643',
  // color3 = '#00FFBF', // Green
  width = 2,
  height = 2,
  widthSegments = 150,
  heightSegments = 150,
}) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const viewport = useThree(state => state.viewport);
  const { theme } = useTheme()

  const color1Obj = useMemo(() => new Color(color1), [color1, theme]);
  const color2Obj = useMemo(() => new Color(color2), [color2, theme]);

  const darkColorsArray = useMemo(() => {
    return [
      new Color('#00FFBF'),
      new Color('#363643'),
      new Color('#0A1128'),
      new Color('#11214F'),
      new Color('#030818')
    ];
  }, []);

  const lightColorsArray = useMemo(() => {
    return [
      new Color('#00FFBF'),
      new Color('#E3FBFF'),
      new Color('#F3F6FF'),
      new Color('#B4C5F6'),
      new Color('#EEF2FE')
    ];
  }, []);

  const [lightThemeColor] = useState(lightColorsArray);
  const [darkThemeColor] = useState(darkColorsArray);

  const [transitionFactor, setTransitionFactor] = useState(theme === 'dark' ? 0 : 1);

  const targetColor = useMemo(() =>
    theme === 'dark' ? darkThemeColor : lightThemeColor,
    [theme, darkThemeColor, lightThemeColor]
  );

  // const [guiValues] = useState({
  //   uWavesElevation: 0.2,
  //   uWavesFrequency: new Vector2(4, 1.5),
  //   uWavesSpeed: 0.75,
  //   uColor1: color1,
  //   uColor2: color2,
  //   uColorOffset: 0.08,
  //   uColorMultiplier: 5,
  // });

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: lavaVertexShader,
      fragmentShader: lavaFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        // uWavesElevation: { value: guiValues.uWavesElevation },
        // uWavesFrequency: { value: guiValues.uWavesFrequency },
        // uWavesSpeed: { value: guiValues.uWavesSpeed },
        uColor1: { value: color1Obj },
        uColor2: { value: color2Obj },
        uColor: { value: targetColor },
        // uColorOffset: { value: guiValues.uColorOffset },
        // uColorMultiplier: { value: guiValues.uColorMultiplier },
        uResolution: {
          value: new Vector2(
            window.innerWidth,
            window.innerHeight
          )
        },
        uThemeTransition: { value: theme === 'dark' ? 0 : 1 },
      }
    });
  }, [color1Obj, color2Obj, darkColorsArray, targetColor]);

  useFrame((state, delta) => {
    if (shaderMaterial.uniforms) {
      shaderMaterial.uniforms.uTime.value += delta;
    }
  });

  useFrame((state, delta) => {
    if (shaderMaterial.uniforms) {
      shaderMaterial.uniforms.uTime.value += delta;

      const currentFactor = transitionFactor;
      const targetFactor = theme === 'dark' ? 0 : 1;

      if (Math.abs(currentFactor - targetFactor) > 0.001) {
        const transitionRate = delta * 1.5;

        const newFactor = targetFactor > currentFactor
          ? Math.min(currentFactor + transitionRate, targetFactor)
          : Math.max(currentFactor - transitionRate, targetFactor);

        setTransitionFactor(newFactor);
        shaderMaterial.uniforms.uThemeTransition.value = newFactor;

        const interpolatedColor = lerpColor(
          darkThemeColor,
          lightThemeColor,
          newFactor
        );

        shaderMaterial.uniforms.uColor2.value = interpolatedColor;
      }
    }
  });

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
