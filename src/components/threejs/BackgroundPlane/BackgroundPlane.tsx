'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, ShaderMaterial, Color, Vector2 } from 'three';
import { useTheme } from 'next-themes'

import lavaFragmentShader from './Shader/Lavalamp/fragment.glsl';
import lavaVertexShader from './Shader/Lavalamp/vertex.glsl';

const lerpColor = (color1: Color, color2: Color, factor: number): Color => {
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
  width = 2,
  height = 2,
  widthSegments = 150,
  heightSegments = 150,
}) => {
  const meshRef = useRef<Mesh>(null);
  const viewport = useThree(state => state.viewport);
  const { theme } = useTheme();

  const darkThemeColors = useMemo(() => [
    new Color('#00FFBF'),
    new Color('#363643'),
    new Color('#0A1128'),
    new Color('#11214F'),
    new Color('#030818')
  ], []);

  const lightThemeColors = useMemo(() => [
    new Color('#00FFBF'),
    new Color('#E3FBFF'),
    new Color('#F3F6FF'),
    new Color('#B4C5F6'),
    new Color('#EEF2FE')
  ], []);

  const color1Obj = useMemo(() => new Color(color1), [color1]);
  const color2Obj = useMemo(() => new Color(color2), [color2]);

  const [transitionFactor, setTransitionFactor] = useState(theme === 'dark' ? 0 : 1);

  const targetColor = useMemo(() =>
    theme === 'dark' ? darkThemeColors : lightThemeColors,
    [theme, darkThemeColors, lightThemeColors]
  );

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: lavaVertexShader,
      fragmentShader: lavaFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: color1Obj },
        uColor2: { value: color2Obj },
        uColor: { value: targetColor },
        uResolution: {
          value: new Vector2(window.innerWidth, window.innerHeight)
        },
        uThemeTransition: { value: theme === 'dark' ? 0 : 1 },
      }
    });
  }, [color1Obj, color2Obj, targetColor, theme]);

  useEffect(() => {
    const handleResize = () => {
      if (shaderMaterial.uniforms) {
        shaderMaterial.uniforms.uResolution.value.set(
          window.innerWidth,
          window.innerHeight
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [shaderMaterial.uniforms]);


  useFrame((state, delta) => {
    if (shaderMaterial.uniforms) {

      shaderMaterial.uniforms.uTime.value += delta;

      const targetFactor = theme === 'dark' ? 0 : 1;

      if (Math.abs(transitionFactor - targetFactor) > 0.001) {
        const transitionRate = delta * 1.25;

        const newFactor = targetFactor > transitionFactor
          ? Math.min(transitionFactor + transitionRate, targetFactor)
          : Math.max(transitionFactor - transitionRate, targetFactor);

        setTransitionFactor(newFactor);
        shaderMaterial.uniforms.uThemeTransition.value = newFactor;

        const interpolatedColor = lerpColor(
          darkThemeColors[0],
          lightThemeColors[0],
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
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export default BackgroundPlane;
