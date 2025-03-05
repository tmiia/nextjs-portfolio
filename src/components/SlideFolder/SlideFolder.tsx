"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './SlideFolder.module.scss'
import { useEffect, useRef } from "react";
import { Slide, type SlideType } from "../Slide/Slide";


interface SlideFolderProps {
  blok: {
    slides: SlideType[];
    [key: string]: any;
  },
  isLoading?: boolean;
}

export const SlideFolder = ({ blok, isLoading }: SlideFolderProps) => {
  useEffect(() => {
    if (!isLoading) {
      console.log(blok);
    }
  }, [isLoading]);

  const ref = useRef<HTMLDivElement>(null)

  return (
    <section
      {...storyblokEditable(blok)}
      className={`grid-container ${styles.section}`}
      ref={ref}
    >
      {blok.slides.map((slide: SlideType, index: number) => (
        <Slide blok={slide} key={index} />
      ))}
    </section>
  );
};
