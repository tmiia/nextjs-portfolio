"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './Hero.module.scss'
import { MaskedCascadingLetters } from "../MaskedCascadingLetters/MaskedCascadingLetters";

interface HeroProps {
  blok: {
    name?: string;
    highlightedTitle?: string;
    wantedJob?: string;
    [key: string]: any;
  };
}

export const Hero = ({ blok }: HeroProps) => {
  console.log("Hero component rendering with blok:", blok);
  if (!blok) {
    console.error("Hero component received undefined blok");
    return <div>Hero component error: No data received</div>;
  }

  return (
    <header {...storyblokEditable(blok)} className={`grid-container ${styles.hero}`}>
      <div className={styles.heroTitles}>
          <MaskedCascadingLetters>
            <h1 className={styles.title}>{blok.highlightedTitle}</h1>
          </MaskedCascadingLetters>
          {/* <h3 className={styles.subtitle}>{blok.highlightedSubtitle}</h3> */}
      </div>
      <p className={styles.heroOverview}>{blok.overview}</p>
    </header>
  );
};
