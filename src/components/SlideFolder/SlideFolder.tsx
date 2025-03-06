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
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (ref.current && !isLoading) {
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];

      slidesRef.current = Array.from(ref.current.querySelectorAll('.js-slide'));

      const unpinTrigger = document.createElement('div');
      unpinTrigger.className = 'unpin-trigger';
      unpinTrigger.style.height = '1px';
      unpinTrigger.style.width = '100%';
      unpinTrigger.style.position = 'relative';
      unpinTrigger.style.zIndex = '-1';

      if (slidesRef.current.length > 0) {
        const lastSlide = slidesRef.current[slidesRef.current.length - 1];
        lastSlide.parentNode?.appendChild(unpinTrigger);
      }

      const removeSticky = () => {
        const highlightedRichtext = document.querySelector('.js-highlightedRichtext');
        if (highlightedRichtext) {
          gsap.to(highlightedRichtext, {
            position: 'relative',
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      };

      ScrollTrigger.create({
        trigger: unpinTrigger,
        start: "top bottom",
        onEnter: removeSticky,

      });

      slidesRef.current.forEach((slide: any, i: number) => {
        const trigger = ScrollTrigger.create({
          trigger: slide,
          start: "bottom bottom",
          pin: true,
          pinSpacing: false,

          onEnter: () => {
            gsap.to(slide, { scale: 1, duration: 0.5 });
          },

          endTrigger: unpinTrigger,
          end: "top bottom",
        });

        scrollTriggersRef.current.push(trigger);
      });
    }

    return () => {

      scrollTriggersRef.current.forEach(trigger => trigger.kill());
    };
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
