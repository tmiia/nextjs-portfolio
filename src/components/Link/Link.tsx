"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './Link.module.scss'
import { useRef } from "react";

export type LinkType = {
  component: string;
  label: string;
  link: {
    id?: string;
    url: string;
    target?: string;
  };
  [key: string]: any;
}

interface LinkProps {
  blok: LinkType,
  className?: string,
  ref?: any
}

export const Link = ({ blok, className, ref }: LinkProps) => {

  return (
    <a
      {...storyblokEditable(blok)}
      className={`${styles.link} ${className}`}
      ref={ref}
      href={blok.link?.url}
      target={blok.link?.target}
    >
      {blok.label}
    </a>
  );
};
