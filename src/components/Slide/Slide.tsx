"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './Slide.module.scss'
import { Key, useRef } from "react";

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
    <article {...storyblokEditable(blok)} className={`grid-container ${styles.slide}`} ref={ref}>
      <h3>{blok.title}</h3>
    </article>
  );
};
