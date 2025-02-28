"use client";
import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";

interface PageProps {
  blok: {
    body?: any[];
    [key: string]: any;
  };
}

export const Page = ({ blok }: PageProps) => {
  console.log("Page component rendering with:", blok);

  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};
