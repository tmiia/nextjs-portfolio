"use client";
import { useEffect, useRef } from 'react';
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './Marquee.module.scss'


interface MarqueeProps {
  children : any,
  speed? : number,
  play?: boolean,
  className?: string,
  container: any
}

export const Marquee = ({ children, speed = 0.07, play = true, className, container }: MarqueeProps) => {
  const marquee = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLElement[]>([]);
  const secondTextRef = useRef<HTMLElement[]>([]);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    if (play) {
      gsap.registerPlugin(ScrollTrigger);
      requestAnimationFrame(animation)

      gsap.to(marquee.current, {
        scrollTrigger : {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.25,
          onUpdate: e => direction = e.direction * -1
        },
        x: '-=300px',
      })
    }
  }, [play]);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0
    }

    if (xPercent > 0) {
      xPercent = -100;
    }

    gsap.set(firstTextRef.current, {xPercent: xPercent})
    gsap.set(secondTextRef.current, {xPercent: xPercent})

    xPercent += speed * direction
    requestAnimationFrame(animation)
  }

  return (
    <div className={`${styles.marquee} ${className}`} ref={marquee}>
      { React.cloneElement(children, {ref: firstTextRef, className: `${children.props.className || ''} ${styles.text}`.trim()}) }
      { React.cloneElement(children, {ref: secondTextRef, className: `${children.props.className || ''} ${styles.text}`.trim()}) }
    </div>
  );
};
