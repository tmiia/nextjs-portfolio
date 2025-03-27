"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './SlideFolder.module.scss'
import { useRef } from "react";
import { Slide, type SlideType } from "../Slide/Slide";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SlideFolderProps {
  blok: {
    slides: SlideType[];
    [key: string]: any;
  },
  isLoading?: boolean;
}

export const SlideFolder = ({ blok, isLoading }: SlideFolderProps) => {
  const ref = useRef<HTMLDivElement>(null)

  if (isLoading) {
    return null
  } else {
    return (
      <section
        {...storyblokEditable(blok)}
        className={`grid-container ${styles.section}`}
        ref={ref}
      >
        {blok.slides.map((slide: SlideType, index: number) => (
          <Slide blok={slide} key={index} index={index} />
        ))}
      </section>
    );
  }
};
