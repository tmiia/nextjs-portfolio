"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './ProjectLink.module.scss'
import { useEffect, useRef } from "react";
import gsap from "gsap";

export type ProjectLinkType = {
  label: string,
  link: {
    id?: string,
    url: string,
    target?: string
  },
  media: {
    filename: string;
    [key: string]: any;
  }
  [key: string]: any;
}

interface ProjectLinkProps {
  blok: ProjectLinkType
}

export const ProjectLink = ({ blok }: ProjectLinkProps) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (ref.current) {

      const mouseMove = (e: any) => {
        const { clientX, clientY } = e;
        const { width, height, top, left } : any = ref.current?.getBoundingClientRect();

        const x = clientX - left;
        const y = clientY - (top + (height / 2));

        gsap.to(imgRef.current, {x: x, y: y, scale: 1})
      }

      const mouseLeave = () => {
        gsap.to(imgRef.current, { scale: 0 })
      }

      ref.current.addEventListener('mousemove', mouseMove)
      ref.current.addEventListener('mouseleave', mouseLeave)
      return () => {

      };
    }
  }, []);

  return (
    <a
      {...storyblokEditable(blok)} className={styles.link} ref={ref} href={blok.link?.url} target={blok.link?.target}>
      {blok.label}
      <img src={blok.media.filename} className={styles.image} ref={imgRef} />
    </a>
  );
};
