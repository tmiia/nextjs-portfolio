'use client'

import { OrbitControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import React, { type FC } from 'react'

import styles from './BackgroundCanvas.module.scss'
import BackgroundPlane from "../BackgroundPlane/BackgroundPlane"

type Props = {}

const BackgroundCanvas : FC<Props> = ({} : Props) => {
  return (
    <Canvas gl={{alpha: false, antialias: false}} className={styles.canvas}>
      <PerspectiveCamera makeDefault={true} position={[0, 0, 5]} />
      <ambientLight intensity={1} />
      <OrbitControls />
      <BackgroundPlane />
    </Canvas>
  )
}

export default BackgroundCanvas;
