"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { Page } from "@/components/Page/Page";
import { Hero } from "@/components/Hero/Hero";
import { CursorImagesTrail } from "../components/CursorImagesTrail/CursorImagesTrail";
import ThemeProvider from "./ThemeProvider";
import { HighlightedRichText } from "../components/HighlightedRichText/HighlightedRichText";
import { RichText } from "../components/RichText/RichText";
import { SlideFolder } from "../components/SlideFolder/SlideFolder";
import { Footer } from "../components/Footer/Footer";
import { StickySect } from "../components/StickySect/StickySect";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    hero: Hero,
    cursorImagesTrail: CursorImagesTrail,
    stickySect: StickySect,
    richText: RichText,
    highlightedRichText: HighlightedRichText,
    slideFolder: SlideFolder,
    footer: Footer
  }
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
