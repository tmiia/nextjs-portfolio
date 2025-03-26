"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './CursorImagesTrail.module.scss';
import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

interface Media {
  filename: string;
  alt?: string;
  [key: string]: any;
}

interface CursorImagesTrailProps {
  blok: {
    media?: Media[];
    [key: string]: any;
  };
  cursorArea: RefObject<HTMLElement | null>;
}

export const CursorImagesTrail = ({ blok, cursorArea }: CursorImagesTrailProps) => {
  const container = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (container.current && cursorArea.current) {
      imagesRef.current = Array.from(
        container.current.querySelectorAll(`.${styles.trailImage}`)
      ) as HTMLImageElement[];

      let idleTimer: NodeJS.Timeout | null = null;

      const mouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;

        imagesRef.current.forEach((img, i) => {
          gsap.to(img, {
            x: clientX,
            y: clientY,
            zIndex: imagesRef.current.length - i,
            scale: 1 + i * 0.01,
            borderRadius: 4,
            opacity: 1 - i * 0.2,
            duration: 0.5,
            ease: "power2.out",
            delay: i * 0.09,
          });
        });

        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(mouseLeave, 300);
      };

      const mouseLeave = () => {
        imagesRef.current.forEach((img, i) => {
          gsap.to(img, {
            scale: 0,
            borderRadius: 16,
            duration: 0.5,
            ease: "power2.out",
            delay: i * 0.05,
          });
        });
      };

      cursorArea.current.addEventListener('mousemove', mouseMove);
      cursorArea.current.addEventListener('mouseleave', mouseLeave);

      return () => {
        cursorArea.current?.removeEventListener('mousemove', mouseMove);
        cursorArea.current?.removeEventListener('mouseleave', mouseLeave);
        if (idleTimer) clearTimeout(idleTimer);
      };
    }
  }, [cursorArea]);

  const mediaItems = blok[0].media || [];

  return (
    <div {...storyblokEditable(blok)} className={styles.cursorImagesTrail} ref={container}>
      {mediaItems.map((m: Media, index: number) => (
        <Image
          key={index}
          src={m.filename || ''}
          alt={m.alt || ''}
          className={styles.trailImage}
          width={200}
          height={112.5}
          priority={false}
        />
      ))}
    </div>
  );
};
