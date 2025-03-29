"use client";
import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";
import Background from "../Background/Background";
import { useEffect, useRef, useState } from "react";
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
      delay: 2,
      onComplete: () => {
        setLoading(false)
      }
    });
  }, []);

  return (
    <main {...storyblokEditable(blok)}>
      <Background isLoading={loading} />
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} isLoading={loading}  />
      ))}
    </main>
  );
};
