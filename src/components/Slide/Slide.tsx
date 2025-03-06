"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './Slide.module.scss'
import { Key, useRef } from "react";
import Background from "../Background/Background";
import { Circle } from "../svgs/circle";

export type SlideType = {
  projects: object,
  subTitle: string,
  title: string,
  [key: string]: any;
}

interface SlideProps {
  blok: SlideType
}

export const Slide = ({ blok }: SlideProps) => {

  const ref = useRef<HTMLElement>(null)

  return (
    <article {...storyblokEditable(blok)} className={`js-slide ${styles.slide}`} ref={ref}>
      <div className={`grid-container ${styles.background}`}>
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className={`${index % 2 === 0 ? `${styles.lg}` : ''} ${styles.grainyCol}`} />
        ))}
      </div>

      <div className={styles.content}>
        <header className={`grid-container ${styles.header}`}>
          <h3 className={styles.title}>{blok.title}</h3>
          <Circle className={styles.circle} width={24} height={24} isFill={Math.random() > 0.5}  />
          <p className={styles.subtitle}>{blok.subTitle}</p>
          <p className={styles.subtitle}>{blok.subtitle2}</p>
        </header>
        <ul>
          <li>list item</li>
        </ul>
      </div>
    </article>
  );
};
