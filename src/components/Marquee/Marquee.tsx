"use client";
import { useEffect, useRef } from 'react';
import React from 'react';
import gsap from 'gsap';
import styles from './Marquee.module.scss'

interface MarqueeProps {
  children : any,
  speed? : number,
  play?: boolean,
  className?: string
}

export const Marquee = ({ children, speed = 0.07, play = true, className }: MarqueeProps) => {
  const firstTextRef = useRef<HTMLElement[]>([]);
  const secondTextRef = useRef<HTMLElement[]>([]);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    if (play) {
      requestAnimationFrame(animation)
    }
  }, [play]);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0
    }

    gsap.set(firstTextRef.current, {xPercent: xPercent})
    gsap.set(secondTextRef.current, {xPercent: xPercent})

    xPercent += speed * direction
    requestAnimationFrame(animation)
  }

  return (
    <div className={`${styles.marquee} ${className}`}>
      { React.cloneElement(children, {ref: firstTextRef, className: `${children.props.className || ''} ${styles.text}`.trim()}) }
      { React.cloneElement(children, {ref: secondTextRef, className: `${children.props.className || ''} ${styles.text}`.trim()}) }
    </div>
  );
};
