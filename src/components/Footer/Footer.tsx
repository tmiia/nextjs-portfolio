"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './Footer.module.scss'
import { useRef } from "react";
import Background from "../Background/Background";
import { Marquee } from "../Marquee/Marquee";
import { CursorImagesTrail, type CursorImagesTraiMediaType } from "../CursorImagesTrail/CursorImagesTrail";
import { SocialList, type SocialListType } from "../SocialList/SocialList";
interface FooterProps {
  blok: {
    component: string;
    marquee: string;
    jobInfo: string;
    schoolInfo: string;
    cursorAnim: CursorImagesTraiMediaType[];
    socialInfo: SocialListType[];
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
          <Marquee className={styles.marquee} container={ref.current || null}>
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
