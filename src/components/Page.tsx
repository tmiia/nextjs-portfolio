"use client";
import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";
import Background from "./Background/Background";
import { useEffect } from "react";
import Lenis from "lenis";

interface PageProps {
  blok: {
    body?: any[];
    [key: string]: any;
  };
}

export const Page = ({ blok }: PageProps) => {
  console.log("Page component rendering with:", blok);

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
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};
