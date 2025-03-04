"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './Hero.module.scss'
import { MaskedCascadingLetters } from "../MaskedCascadingLetters/MaskedCascadingLetters";
import { FadingReveal } from "../FadingReveal/FadingReveal";
import { CursorImagesTrail } from "../CursorImagesTrail/CursorImagesTrail";
import { useEffect, useRef, useState } from "react";
import { Circle } from "../svgs/circle";

interface HeroProps {
  blok: {
    name?: string;
    highlightedTitle?: string;
    highlightedSubtitle?: string;
    overview?: string;
    [key: string]: any;
  },
  isLoading?: boolean;
}

export const Hero = ({ blok, isLoading }: HeroProps) => {

  const [loadingPulse, setLoadingPulse] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setLoadingPulse((prevPulse) => (prevPulse + 1) % 3);
      }, 400);

      return () => clearInterval(intervalId);
    }
  }, [isLoading]);

  const ref = useRef<HTMLElement>(null)

  return (
    <header {...storyblokEditable(blok)} className={`grid-container ${styles.hero}`} ref={ref}>
      <div className={styles.heroTitles} style={{zIndex: isLoading ? 1500 : 1}}>
          <MaskedCascadingLetters play={!isLoading}>
            <h1 className={styles.title}>{blok.highlightedTitle}</h1>
          </MaskedCascadingLetters>

          <div className={styles.bottom}>
            <div className={styles.circleContainer}>
              <Circle height={24} width={24} isFill={loadingPulse === 0 ? true : false } play={!isLoading} />
              <Circle height={24} width={24} isFill={loadingPulse === 1 ? true : false } play={!isLoading} />
              <Circle height={24} width={24} isFill={loadingPulse === 2 ? true : false } play={!isLoading} />
            </div>
            <FadingReveal play={!isLoading} delay={0.8} duration={2.1}>
              <h3 className={styles.subtitle}>{blok.highlightedSubtitle}</h3>
            </FadingReveal>
          </div>
      </div>
      <FadingReveal play={!isLoading} delay={0.9} duration={1}>
        <p className={styles.heroOverview}>{blok.overview}</p>
      </FadingReveal>

      <CursorImagesTrail blok={blok.cursorAnim} cursorArea={ref || null} />
    </header>
  );
};
