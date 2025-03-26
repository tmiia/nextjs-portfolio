"use client";
import { useEffect, useRef, ReactElement, cloneElement } from 'react';
import gsap from 'gsap';
import styles from './FadingReveal.module.scss';

interface FadingRevealProps {
  children: ReactElement;
  duration?: number;
  delay?: number;
  play: boolean;
}

export const FadingReveal = ({ children, duration = 0.5, delay = 0, play }: FadingRevealProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (play && ref.current) {
      gsap.to(ref.current, {
        opacity: 1,
        duration,
        ease: 'expo.inOut',
        delay
      });
    }
  }, [play, duration, delay]);

  return cloneElement(children, {
    ref,
    className: `${(children.props as { className?: string }).className || ''} ${styles.fadingElt}`.trim()
  } as any);
};
