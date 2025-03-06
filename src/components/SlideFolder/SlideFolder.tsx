"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './SlideFolder.module.scss'
import { useEffect, useRef } from "react";
import { Slide, type SlideType } from "../Slide/Slide";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SlideFolderProps {
  blok: {
    slides: SlideType[];
    [key: string]: any;
  },
  isLoading?: boolean;
}

export const SlideFolder = ({ blok, isLoading }: SlideFolderProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (ref.current && !isLoading) {
      slidesRef.current = Array.from(ref.current.querySelectorAll('.js-slide'));

      slidesRef.current.forEach((slide: any, i: number) => {
          ScrollTrigger.create({
            trigger: slide,
            // start: "95% 100%",
            start: "bottom bottom",
            pin: true,
            pinSpacing: false,
            // markers: true,
            onEnter: () => {
              gsap.to(slide, { scale: 1, duration: 0.5 });
            },
          });
        });
    }
  }, [isLoading]);


  if (isLoading) {
    return null
  } else {
    return (
      <section
        {...storyblokEditable(blok)}
        className={`grid-container ${styles.section}`}
        ref={ref}
      >
        {blok.slides.map((slide: SlideType, index: number) => (
          <Slide blok={slide} key={index} />
        ))}
      </section>
    );
  }
};
