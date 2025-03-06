"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './ProjectList.module.scss'
import { useRef } from "react";
import { ProjectLink } from "../ProjectLink/ProjectLink";

export type ProjectListType = {
  component: string;
  isCenter: boolean,
  list: Array<{
    component: string;
    label: string;
    link: {
      id?: string;
      url: string;
      target?: string;
    };
    media: {
      filename: string;
      [key: string]: any;
    };
    _uid: string;
    _editable?: string;
    [key: string]: any;
  }>;
  _uid: string;
  _editable?: string;
  [key: string]: any;
}

interface ProjectListProps {
  blok: ProjectListType
}

export const ProjectList = ({ blok }: ProjectListProps) => {
  const ref = useRef<HTMLUListElement>(null)

  return (
    <ul {...storyblokEditable(blok)} className={`${styles.list} ${blok.isCenter ? styles.center : styles.left}`} ref={ref}>
      {blok.list && blok.list.map((item, index) => (
        <li key={item._uid || index}>
          <ProjectLink blok={item} />
        </li>
      ))}
    </ul>
  );
};
