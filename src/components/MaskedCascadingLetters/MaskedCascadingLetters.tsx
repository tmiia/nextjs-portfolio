"use client";
import { ReactNode, useEffect, useRef } from 'react';
import styles from './MaskedCascadingLetters.module.scss'
import React from 'react';
import SplitType from 'split-type'
import gsap from 'gsap';

interface MaskedCascadingLettersProps {
  children : any,
  play: boolean
}

export const MaskedCascadingLetters = ({ children, play }: MaskedCascadingLettersProps) => {

  const ref = useRef<HTMLElement>(null);
  const refclone1 = useRef<HTMLElement>(null);
  const refclone2 = useRef<HTMLElement>(null);
  const refclone3 = useRef<HTMLElement>(null);
  const refclone4 = useRef<HTMLElement>(null);

  useEffect(() => {
    if (play) {
      const elements = [refclone1.current, refclone2.current, refclone3.current, refclone4.current]

      gsap.set(elements, {opacity: 1});

      elements.forEach((el, i) => {
        const text = new SplitType(el as HTMLElement, { types: 'chars' });
        const chars = text.chars;

          if (chars) {
            chars.forEach(char => {
              char.classList.add(`reveal-${i}`);
            });


            gsap.fromTo(
              `.reveal-${i}`,
              { y: i === 0 ? 150 : ((i + 1) * 150)},
              {
                y: -((elements.length * 150) - ((i + 1) * 150)),
                duration: 2.3,
                stagger: -0.1,
                ease: 'power4.inOut',
                delay: i === 0 ? 0 : -0.015,
              }
            );
          }

      });
    }
  }, [play]);

  return (
    <div className={styles.masked}>
      {
        React.cloneElement(children, {
          ref,
          className: `${children.props.className || ''} ${styles.ref}`.trim()
        })
      }

      {
        React.cloneElement(children, {
          ref: refclone1,
          className: `${children.props.className || ''} ${styles.clone}`.trim()
        })
      }

      {
        React.cloneElement(children, {
          ref: refclone2,
          className: `${children.props.className || ''} ${styles.clone}`.trim()
        })
      }

      {
        React.cloneElement(children, {
          ref: refclone3,
          className: `${children.props.className || ''} ${styles.clone}`.trim()
        })
      }

{
        React.cloneElement(children, {
          ref: refclone4,
        })
      }
    </div>
  );
};
