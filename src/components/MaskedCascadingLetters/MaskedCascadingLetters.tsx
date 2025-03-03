"use client";
import { ReactNode, useEffect, useRef } from 'react';
import styles from './MaskedCascadingLetters.module.scss'
import React from 'react';
import SplitType from 'split-type'
import gsap from 'gsap';

interface MaskedCascadingLettersProps {
  children : any
}

export const MaskedCascadingLetters = ({ children }: MaskedCascadingLettersProps) => {

  const ref = useRef<HTMLElement>(null);
  const refclone1 = useRef<HTMLElement>(null);
  const refclone2 = useRef<HTMLElement>(null);
  const refclone3 = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = [refclone1.current, refclone2.current, refclone3.current]

    elements.forEach((el, i) => {
      const text = new SplitType(el as HTMLElement, { types: 'chars' });
      const chars = text.chars;

        if (chars) {
          chars.forEach(char => {
            char.classList.add(`reveal-${i}`);
          });

          gsap.fromTo(
            `.reveal-${i}`,
            { y: i === 0 ? 0 : ((i + 1) * 100) },
            {
              y: -((elements.length * 100) - ((i + 1) * 100)),
              duration: 0.75,
              stagger: 0.095,
              ease: 'sine.inOut',
              delay: 0.2,
            }
          );
        }

    });
  }, []);

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
          className: `${children.props.className || ''} ${styles.clone1}`.trim()
        })
      }

      {
        React.cloneElement(children, {
          ref: refclone2,
          className: `${children.props.className || ''} ${styles.clone2}`.trim()
        })
      }

      {
        React.cloneElement(children, {
          ref: refclone3,
          className: `${children.props.className || ''} ${styles.clone3}`.trim()
        })
      }
    </div>
  );
};
