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
  blok: SocialListType
}

export const SocialList = ({ blok }: SocialListProps) => {
  const ref = useRef<HTMLUListElement>(null)

  return (
    <ul {...storyblokEditable(blok)} className={styles.list} ref={ref}>
      {blok.links && blok.links.map((item, index) => (
        <li key={item._uid || index}>
          <Link blok={item} />
        </li>
      ))}
    </ul>
  );
};
