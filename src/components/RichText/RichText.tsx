"use client";
import React, { RefObject } from "react";
import { richTextResolver } from "@storyblok/richtext";
import { storyblokEditable } from "@storyblok/react";
import styles from './RichText.module.scss'

interface RichTextProps {
  blok: {
    content: {
      richtextField: any;
    };
  },
  ref: RefObject<HTMLDivElement | null>
}

export const RichText = ({ blok, ref }: RichTextProps) => {
  if (!blok?.content?.richtextField) return null;

  const { render } = richTextResolver();
  const html = render(blok.content.richtextField) as string;
  return <div {...storyblokEditable(blok)} dangerouslySetInnerHTML={{ __html: html }} className={styles.container} ref={ref} />;
};
