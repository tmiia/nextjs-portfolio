"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { Page } from "@/components/Page";
import { Hero } from "@/components/Hero";
import ThemeProvider from "./ThemeProvider";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    hero: Hero
  }
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
