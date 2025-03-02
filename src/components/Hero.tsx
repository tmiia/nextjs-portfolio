"use client";
import { storyblokEditable } from "@storyblok/react";
import BackgroundCanvas from "./threejs/BackgroundCanvas/BackgroundCanvas";
import Background from "./Background/Background";

interface HeroProps {
  blok: {
    name?: string;
    highlightedTitle?: string;
    wantedJob?: string;
    [key: string]: any;
  };
}

export const Hero = ({ blok }: HeroProps) => {
  console.log("Hero component rendering with blok:", blok);
  if (!blok) {
    console.error("Hero component received undefined blok");
    return <div>Hero component error: No data received</div>;
  }

  return (
    <header {...storyblokEditable(blok)}>
      <div className="max-w-4xl mx-auto">
        {blok.name && (
          <h2>Name: {blok.name}</h2>
        )}

        {blok.highlighted_title && (
          <h1>
            Title: {blok.highlighted_title}
          </h1>
        )}

          <div>
            Job: {blok.wanted_job}
          </div>

        <div className="mt-8 p-4 bg-gray-200 text-sm">
          <p>Debug - Available blok properties:</p>
          <pre>{JSON.stringify(blok, null, 2)}</pre>
        </div>
      </div>
    </header>
  );
};
