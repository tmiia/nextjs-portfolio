"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './Footer.module.scss'
import { useRef } from "react";
import Background from "../Background/Background";
import { Marquee } from "../Marquee/Marquee";

interface FooterProps {
  blok: {
    marquee: string;
    [key: string]: any;
  },
  isLoading?: boolean;
}

export const Footer = ({ blok, isLoading }: FooterProps) => {
  const ref = useRef<HTMLElement>(null)

  if (isLoading) {
    return null
  } else {
    return (
      <footer {...storyblokEditable(blok)} className={`grid-container ${styles.footer}`} ref={ref}>


        <Marquee className={styles.marquee}>
          <strong className={styles.marqueeText}>{blok.marquee}</strong>
        </Marquee>
      </footer>
    );
  }
};
