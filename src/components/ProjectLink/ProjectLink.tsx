"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './ProjectLink.module.scss'
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "../Link/Link";

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
  [key: string]: any;
}

interface ProjectLinkProps {
  blok: ProjectLinkType
}

export const ProjectLink = ({ blok }: ProjectLinkProps) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const rotationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const mouseEnter = () => {
        setIsHovering(true);
      };

      const mouseMove = (e: any) => {
        const { clientX, clientY } = e;
        const { width, height, top, left } = ref.current?.getBoundingClientRect() || {};
        if (!left || !top) return;

        const x = clientX + 150;
        const y = clientY - (top + 50);

        const moveX = clientX - lastPositionRef.current.x;
        const rotation = moveX > 0 ? 10 : moveX < 0 ? -10 : 0;

        lastPositionRef.current = { x: clientX, y: clientY };

        gsap.to(imgRef.current, {
          x: x,
          y: y,
          scale: 1,
          rotation: rotation,
          ease: "power2.out"
        });

        if (rotationTimeoutRef.current) {
          clearTimeout(rotationTimeoutRef.current);
        }

        rotationTimeoutRef.current = setTimeout(() => {
          if (imgRef.current) {
            gsap.to(imgRef.current, {
              rotation: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        }, 300);
      }

      const mouseLeave = () => {
        setIsHovering(false);
        gsap.to(imgRef.current, { scale: 0, rotation: 0 });


        if (rotationTimeoutRef.current) {
          clearTimeout(rotationTimeoutRef.current);
          rotationTimeoutRef.current = null;
        }
      }

      ref.current.addEventListener('mouseenter', mouseEnter);
      ref.current.addEventListener('mousemove', mouseMove);
      ref.current.addEventListener('mouseleave', mouseLeave);

      return () => {
        ref.current?.removeEventListener('mouseenter', mouseEnter);
        ref.current?.removeEventListener('mousemove', mouseMove);
        ref.current?.removeEventListener('mouseleave', mouseLeave);

        if (rotationTimeoutRef.current) {
          clearTimeout(rotationTimeoutRef.current);
        }
      };
    }
  }, []);

  return (
    <figcaption className={styles.linkContainer} ref={ref}>
      <Link
        blok={blok}
        className={`${styles.link} ${isHovering ? styles.linkHover : ''}`}
      />
      {blok.media?.filename && (
        <img src={blok.media.filename} className={styles.image} ref={imgRef} alt={blok.media.alt || ''} />
      )}
    </figcaption>
  );
};
