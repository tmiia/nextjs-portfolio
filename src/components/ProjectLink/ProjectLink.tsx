"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './ProjectLink.module.scss'
import { useEffect, useRef } from "react";
import gsap from "gsap";

export type ProjectLinkType = {
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
        const { width, height, top, left } = ref.current?.getBoundingClientRect() || {};
        if (!left || !top) return;

        const x = clientX - left;
        const y = clientY - (top + (height ?? 0 / 2));

        gsap.to(imgRef.current, {x: x, y: y, scale: 1})
      }

      const mouseLeave = () => {
        gsap.to(imgRef.current, { scale: 0 })
      }

      ref.current.addEventListener('mousemove', mouseMove)
      ref.current.addEventListener('mouseleave', mouseLeave)

      return () => {
        ref.current?.removeEventListener('mousemove', mouseMove);
        ref.current?.removeEventListener('mouseleave', mouseLeave);
      };
    }
  }, []);

  return (
    <a
      {...storyblokEditable(blok)}
      className={styles.link}
      ref={ref}
      href={blok.link?.url}
      target={blok.link?.target}
    >
      {blok.label}
      {blok.media?.filename && (
        <img src={blok.media.filename} className={styles.image} ref={imgRef} alt={blok.media.alt || ''} />
      )}
    </a>
  );
};
