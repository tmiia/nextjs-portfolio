'use client'

import React, { type FC } from 'react'
import styles from './Background.module.scss'
import BackgroundCanvas from '../threejs/BackgroundCanvas/BackgroundCanvas'

type Props = {
  columns?: number,
  isLoading?: boolean
}

const Background: FC<Props> = ({ columns = 4, isLoading = false }: Props) => {
  return (
    <div className={styles.backgroundContainer}>
      <BackgroundCanvas />
      <div className={`grid-container ${styles.colsContainer}`}>
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className={`${index % 2 === 0 ? `${styles.lg}` : ''} ${styles.grainyCol} ${!isLoading ? styles.withNoise : ''}`}/>
        ))}
      </div>
      <div className={`grid-container ${styles.colsContainer}`}>
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className={`${index % 2 === 0 ? `${styles.lg}` : ''} ${styles.grainyCol} ${!isLoading ? styles.withNoise : ''}`}/>
        ))}
      </div>
    </div>
  )
}

export default Background
