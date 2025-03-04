"use client";
import { useEffect, useRef } from 'react';
import React from 'react';
import gsap from 'gsap';
import styles from './FadingReveal.module.scss'

interface FadingRevealProps {
  children : any,
  duration? : number,
  delay? : number,
  play: boolean
}

export const FadingReveal = ({ children, duration = 0.5, delay = 0, play }: FadingRevealProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (play) {
      gsap.to(ref.current, { opacity: 1, duration: duration, ease: 'expo.inOut', delay: delay })
    }
  }, [play]);

  return (
    React.cloneElement(children, {ref, className: `${children.props.className || ''} ${styles.fadingElt}`.trim()})
  );
};
