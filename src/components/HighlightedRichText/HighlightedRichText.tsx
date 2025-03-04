"use client";
import { storyblokEditable, StoryblokRichTextProps } from "@storyblok/react";
import styles from './highlightedRichText.module.scss'
import { RichText } from "../RichText/RichText";

interface HighlightedRichTextProps {
  blok: {
    text?: any;
    [key: string]: any;
  };
}

export const HighlightedRichText = ({ blok }: HighlightedRichTextProps) => {
  console.log("highlighted Rich Text component rendering with blok:", blok);

  return (
    <section {...storyblokEditable(blok)} className={styles.section}>
      <RichText blok={{ content: { richtextField: blok.text } }} />
    </section>
  );
};
