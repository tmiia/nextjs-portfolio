"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CircleProps {
  height?: number,
  width?: number,
  color?: string,
  isFill?: boolean,
  play?: boolean,
  className?: string
}

export const Circle = ({ height = 16, width = 16, color = '#ffffff', isFill, play, className }: CircleProps) => {
  const ref = useRef(null)

  useEffect(() => {
    if (play) {
      gsap.fromTo(ref.current,
        {
          scale: 0.6,
          y: 10,
          duration: 0.3,
          ease: 'expo.inOut',
        },
        {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'expo.inOut',
          delay: 1.45
        }
      )
    }
  }, [play]);

  return (
    <svg className={className} width={width} height={height} viewBox="0 0 16 16" fill={isFill ? color : 'transparent'} xmlns="http://www.w3.org/2000/svg" style={{color:color, transition:'.3s ease-in-out'}} ref={ref}>
      <circle cx="8" cy="8" r="7.5" stroke="white"/>
    </svg>
  );
};
