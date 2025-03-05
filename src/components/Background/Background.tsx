'use client'

import React, { type FC } from 'react'
import styles from './Background.module.scss'
import BackgroundCanvas from '../threejs/BackgroundCanvas/BackgroundCanvas'

type Props = {
  columns?: number
}

const Background: FC<Props> = ({ columns = 4 }: Props) => {
  return (
    <div className={styles.backgroundContainer}>
      <BackgroundCanvas />
      <div className={`grid-container ${styles.colsContainer}`}>
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className={`${index % 2 === 0 ? `${styles.lg}` : ''} ${styles.grainyCol}`} />
        ))}
      </div>
      <div className={`grid-container ${styles.colsContainer}`}>
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className={`${index % 2 === 0 ? `${styles.lg}` : ''} ${styles.grainyCol}`} />
        ))}
      </div>
    </div>
  )
}

export default Background
