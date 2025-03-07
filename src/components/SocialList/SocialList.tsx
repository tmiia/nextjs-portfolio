"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './ProjectList.module.scss'
import { useRef } from "react";
import { ProjectLink } from "../ProjectLink/ProjectLink";
import { Link } from "../Link/Link";

export type ProjectListType = {
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

interface ProjectListProps {
  blok: ProjectListType
}

export const ProjectList = ({ blok }: ProjectListProps) => {
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
