"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './Hero.module.scss'
import { MaskedCascadingLetters } from "../MaskedCascadingLetters/MaskedCascadingLetters";
import { FadingReveal } from "../FadingReveal/FadingReveal";
import { CursorImagesTrail } from "../CursorImagesTrail/CursorImagesTrail";
import { useRef } from "react";

interface HeroProps {
  blok: {
    name?: string;
    highlightedTitle?: string;
    highlightedSubtitle?: string;
    overview?: string;
    [key: string]: any;
  };
}

export const Hero = ({ blok }: HeroProps) => {
  console.log("Hero component rendering with blok:", blok);
  if (!blok) {
    console.error("Hero component received undefined blok");
    return <div>Hero component error: No data received</div>;
  }

  const ref = useRef<HTMLElement>(null)

  return (
    <header {...storyblokEditable(blok)} className={`grid-container ${styles.hero}`} ref={ref}>
      <div className={styles.heroTitles}>
          <MaskedCascadingLetters>
            <h1 className={styles.title}>{blok.highlightedTitle}</h1>
          </MaskedCascadingLetters>
          <FadingReveal delay={0.8} duration={2.1}>
            <h3 className={styles.subtitle}>{blok.highlightedSubtitle}</h3>
          </FadingReveal>
      </div>
      <FadingReveal delay={4} duration={1}>
        <p className={styles.heroOverview}>{blok.overview}</p>
      </FadingReveal>

      <CursorImagesTrail blok={blok.cursorAnim} cursorArea={ref || null} />
    </header>
  );
};
