"use client";
import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";
import Background from "../Background/Background";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import styles from "./Page.module.scss"
import gsap from "gsap";

interface PageProps {
  blok: {
    body?: any[];
    [key: string]: any;
  };
}

export const Page = ({ blok }: PageProps) => {
  const loadingRef = useRef(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gsap.to(loadingRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'expo.Out',
      delay: 2,
      onComplete: () => {
        setLoading(false)
      }
    });
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: any) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, []);

  return (
    <main {...storyblokEditable(blok)}>
      <Background />
      {loading && (
        <div ref={loadingRef} style={{zIndex: 900, position: 'fixed', inset: 0, width:'100%', height:'100%', backgroundColor:'var(--background-color)'}} />
      )}
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} isLoading={loading}  />
      ))}
    </main>

  );
};
