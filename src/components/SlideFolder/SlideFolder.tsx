"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './SlideFolder.module.scss'
import { useEffect, useRef } from "react";

interface SlideFolderProps {
  blok: {
    slides: object;
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

  const ref = useRef<HTMLElement>(null)

  return (
    <section {...storyblokEditable(blok)} className={`grid-container ${styles.section}`} ref={ref}>

    </section>
  );
};
