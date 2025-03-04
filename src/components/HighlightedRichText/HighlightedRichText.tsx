"use client";
import { storyblokEditable, StoryblokRichTextProps } from "@storyblok/react";
import styles from './highlightedRichText.module.scss'
import { RichText } from "../RichText/RichText";
import { useRef, useEffect } from "react";
import SplitType from "split-type";

interface HighlightedRichTextProps {
  blok: {
    text?: any;
    [key: string]: any;
  };
}

export const HighlightedRichText = ({ blok }: HighlightedRichTextProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
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
    }
  }, []);

  return (
    <section {...storyblokEditable(blok)} className={styles.section}>
      <RichText blok={{ content: { richtextField: blok.text } }} ref={ref} />
    </section>
  );
};
