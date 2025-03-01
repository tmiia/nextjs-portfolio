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
      <div className={styles.colsContainer}>
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className={styles.grainyCol} />
        ))}
      </div>
      <div className={styles.colsContainer}>
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className={styles.grainyCol} />
        ))}
      </div>
    </div>
  )
}

export default Background
