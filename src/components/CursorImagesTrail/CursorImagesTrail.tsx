"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './CursorImagesTrail.module.scss'
import { Key, RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CursorImagesTrailProps {
  blok: {
    media: {
      filename: string;
      [key: string]: any;
    }[];
    [key: string]: any;
  };
  cursorArea : RefObject<HTMLElement | null>
}

export const CursorImagesTrail = ({ blok, cursorArea }: CursorImagesTrailProps) => {
  console.log("CursorImagesTrail component rendering with blok:", blok);

  const container = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([]);


  useEffect(() => {
    if (container.current && cursorArea.current) {
      imagesRef.current = Array.from(container.current.querySelectorAll(`.${styles.trailImage}`));
      let idleTimer: NodeJS.Timeout | null = null;

      const mouseMove = (e: { clientX: number; clientY: number; }) => {
        const { clientX, clientY } = e;

        imagesRef.current.forEach((img, i) => {
          gsap.to(img, {
            x: clientX,
            y: clientY,
            zIndex: imagesRef.current.length - i,
            scale: 1 + i * 0.01,
            borderRadius: 0,
            opacity: 1 - i * 0.2,
            duration: 0.5,
            ease: "power2.out",
            delay: i * 0.09,
          });
        });

        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(mouseLeave, 300);
      }

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
      }

      cursorArea.current.addEventListener('mousemove', mouseMove)
      cursorArea.current.addEventListener('mouseleave', mouseLeave)

      return () => {
        cursorArea.current?.removeEventListener('mousemove', mouseMove)
        cursorArea.current?.addEventListener('mouseleave', mouseLeave)
        if (idleTimer) clearTimeout(idleTimer);

      }
    }
  }, []);


  return (
    <div {...storyblokEditable(blok)} className={styles.cursorImagesTrail} ref={container}>
      {blok[0].media.map((m: { filename: string | undefined; }, index: Key | null | undefined) => (
        <img key={index} src={m.filename} alt="" className={styles.trailImage} />
      ))}
    </div>
  );
};
