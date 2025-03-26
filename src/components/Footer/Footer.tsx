"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './Footer.module.scss'
import { useRef } from "react";
import Background from "../Background/Background";
import { Marquee } from "../Marquee/Marquee";
import { CursorImagesTrail } from "../CursorImagesTrail/CursorImagesTrail";
import { SocialList } from "../SocialList/SocialList";

interface CursorAnimItem {
  component: string;
  media: Array<{
    id: number;
    filename: string;
    alt: string;
  }>;
}

interface SocialInfoItem {
  component: string;
  label: string;
  links: Array<{
    component: string;
    label: string;
    link: {
      id?: string;
      url: string;
      target?: string;
    };
  }>;
}

interface FooterProps {
  blok: {
    component: string;
    marquee: string;
    jobInfo: string;
    schoolInfo: string;
    cursorAnim: CursorAnimItem[];
    socialInfo: SocialInfoItem[];
  };
  isLoading?: boolean;
}

export const Footer = ({ blok, isLoading }: FooterProps) => {
  const ref = useRef<HTMLElement>(null)

  if (isLoading) {
    return null
  } else {
    return (
      <footer {...storyblokEditable(blok)} className={`grid-container ${styles.footer}`} ref={ref}>
        <Marquee className={styles.marquee} container={ref.current}>
          <strong className={styles.marqueeText}>{blok.marquee}</strong>
        </Marquee>

        <CursorImagesTrail blok={blok.cursorAnim} cursorArea={ref || null} />

        <div className={styles.info}>
          <p className={styles.job}>{blok.jobInfo}</p>
          <p className={styles.school}>{blok.schoolInfo}</p>
        </div>

        {blok.socialInfo && blok.socialInfo.length > 0 && (
          <SocialList blok={blok.socialInfo[0]} className={styles.socialList} />
        )}
      </footer>
    );
  }
};
