"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './highlightedRichText.module.scss'
import { RichText } from "../RichText/RichText";
import { useRef, useEffect } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

interface HighlightedRichTextProps {
  blok: {
    text?: any;
    [key: string]: any;
  };
  isLoading: boolean
}

export const HighlightedRichText = ({ blok, isLoading }: HighlightedRichTextProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (ref.current && !isLoading) {

      const text = new SplitType(ref.current, {
        types: ['words', 'chars']
      });

      const chars = text.chars;
      if (chars) {
        chars.forEach(char => {
          if (char.innerText === char.innerText.toUpperCase()) {
            char.classList.add(styles.uppercase);
          }
        });
      }

      const words = text.words;
      if (words) {
        gsap.set(words, { opacity: 0 });

        gsap.to(words, {
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "bottom 90%",
            scrub: 1,
          }
        });
      }

      imagesRef.current = Array.from(ref.current.querySelectorAll('img'));
      if (imagesRef.current.length > 0) {
        gsap.set(imagesRef.current, { width: 0 });

        gsap.to(imagesRef.current, {
          width: 'revert-layer',
          stagger: 0.5,
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          }
        });
      }

      return () => {
        text.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [isLoading]);

  if (isLoading) {
    return null
  }
  else {
    return (
      <section {...storyblokEditable(blok)} className={styles.section}>
        <RichText blok={{ content: { richtextField: blok.text } }} ref={ref} />
      </section>
    );
  }

};
