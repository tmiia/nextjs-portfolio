"use client";
import { forwardRef } from "react";
import { storyblokEditable } from "@storyblok/react";
import styles from "./Link.module.scss";

export type LinkType = {
  component: string;
  label: string;
  link: {
    id?: string;
    url: string;
    target?: string;
  };
  [key: string]: any;
};

interface LinkProps {
  blok: LinkType;
  className?: string;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ blok, className }, ref) => {
    return (
      <a
        {...storyblokEditable(blok)}
        className={`${styles.link} ${className || ""}`}
        ref={ref}
        href={blok.link?.url}
        target={blok.link?.target}
      >
        {blok.label}
      </a>
    );
  }
);

Link.displayName = "Link";
