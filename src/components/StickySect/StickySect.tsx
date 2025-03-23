"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './StickySect.module.scss'
import { useRef } from "react";
import { HighlightedRichText } from "../HighlightedRichText/HighlightedRichText";
import { SlideFolder } from "../SlideFolder/SlideFolder";

interface StickySectProps {
  blok: {
    marquee: string;
    [key: string]: any;
  },
  isLoading?: boolean;
}

export const StickySect = ({ blok, isLoading }: StickySectProps) => {
  const ref = useRef<HTMLElement>(null)

  console.log(blok);


  if (isLoading) {
    return null
  } else {
    return (
      <section {...storyblokEditable(blok)} className={`${styles.section}`} ref={ref}>
        <HighlightedRichText blok={blok.container[0]} isLoading={isLoading ? true : false} />
        <SlideFolder blok={blok.container[1]} />
      </section>
    );
  }
};
