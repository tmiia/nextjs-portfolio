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
  const refclone4 = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = [refclone1.current, refclone2.current, refclone3.current, refclone4.current]

    elements.forEach((el, i) => {
      const text = new SplitType(el as HTMLElement, { types: 'chars' });
      const chars = text.chars;

        if (chars) {
          chars.forEach(char => {
            char.classList.add(`reveal-${i}`);
          });

          gsap.fromTo(
            `.reveal-${i}`,
            { y: i === 0 ? 150 : ((i + 1) * 150),
              rotate: i === 0 ? 0 : 4
            },
            {
              y: -((elements.length * 150) - ((i + 1) * 150)),
              rotate: 0,
              duration: 1.6,
              stagger: -0.02,
              ease: 'power4.inOut',
              delay: i === 0 ? 0 : -0.015,
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
