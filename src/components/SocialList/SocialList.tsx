"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './SocialList.module.scss'
import { useRef } from "react";
import { ProjectLink } from "../ProjectLink/ProjectLink";
import { Link } from "../Link/Link";

export type SocialListType = {
  links: Array<{
    component: string;
    label: string;
    link: {
      id?: string;
      url: string;
      target?: string;
    };
    [key: string]: any;
  }>;
  [key: string]: any;
}

interface SocialListProps {
  blok: SocialListType,
  className?: string
}

export const SocialList = ({ blok, className }: SocialListProps) => {
  const ref = useRef<HTMLUListElement>(null)

  return (
    <ul className={`${styles.list} ${className}`} ref={ref}>
      {blok.links && blok.links.map((item, index) => (
        <li key={item._uid || index}>
          <Link blok={item} />
        </li>
      ))}
    </ul>
  );
};
