"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './StickySect.module.scss'
import { useRef } from "react";
import { HighlightedRichText } from "../HighlightedRichText/HighlightedRichText";
import { SlideFolder } from "../SlideFolder/SlideFolder";

interface StickySectProps {
  blok: {
    component: string;
    container: Array<{
      component: string;
      [key: string]: any;
    }>;
    [key: string]: any;
  };
  isLoading?: boolean;
}

export const StickySect = ({ blok, isLoading }: StickySectProps) => {
  const ref = useRef<HTMLElement>(null)

  if (isLoading) {
    return null
  }

  return (
    <section {...storyblokEditable(blok)} className={`${styles.section}`} ref={ref}>
      {blok.container[0] && blok.container[0].component === 'highlightedRichText' && (
        <HighlightedRichText blok={{ richtextField: blok.container[0].text?.[0], ...blok.container[0] }} isLoading={false} />
      )}

      {blok.container[1] && blok.container[1].component === 'slideFolder' && (
        <SlideFolder blok={{ slides: blok.container[1].slides, ...blok.container[1] }} isLoading={false} />
      )}
    </section>
  );
};
