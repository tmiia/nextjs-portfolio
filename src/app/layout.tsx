import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.scss";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "../components/providers/StoryblokProvider";
import { Page } from "@/components/Page/Page";
import { Hero } from "@/components/Hero/Hero";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import { CursorImagesTrail } from "@/components/CursorImagesTrail/CursorImagesTrail";
import { HighlightedRichText } from "@/components/HighlightedRichText/HighlightedRichText";
import { RichText } from "@/components/RichText/RichText";
import { SlideFolder } from "@/components/SlideFolder/SlideFolder";
import { Footer } from "@/components/Footer/Footer";
import { StickySect } from "@/components/StickySect/StickySect";


const Thunder = localFont({
  src: '../../public/fonts/Thunder-VF.ttf',
  variable: '--font-thunder',
})

const Dirtyline = localFont({
  src: '../../public/fonts/Dirtyline.ttf',
  variable: '--font-dirtyline',
})

export const metadata: Metadata = {
  title: "Nehémia Telusma • Front End Developer",
  description: "Nehémia Telusma, a Front End Developer based in Paris, looking for an apprenticeship.",
  metadataBase: new URL('https://www.nehemiatelusma.com'),
  keywords: ['Front End Developer', 'Web Development', 'React', 'NextJS', 'Paris', 'Developer Portfolio', 'Gobelins', 'Nehémia Telusma'],
  authors: [{ name: 'Nehémia Telusma' }],
  creator: 'Nehémia Telusma',
  publisher: 'Nehémia Telusma',

  openGraph: {
    type: 'website',
    title: 'Nehémia Telusma • Front End Developer',
    description: "Nehémia Telusma, a Front End Developer based in Paris, looking for an apprenticeship.",
    url: 'https://www.nehemiatelusma.com',
    siteName: 'Nehémia Telusma Portfolio',
    images: [
      {
        url: '/seo/seo_miiadev_portfolio.png',
        width: 1200,
        height: 630,
        alt: 'Nehémia Telusma - Front End Developer Portfolio',
      },
    ],
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nehémia Telusma • Front End Developer',
    description: 'Front End Developer based in Paris seeking apprenticeship opportunities',
    images: ['/seo/seo_miiadev_portfolio.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://www.nehemiatelusma.com',
  },
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Thunder.variable} ${Dirtyline.variable}`}>
        <StoryblokProvider>
          <ThemeSwitcher />
          {children}
        </StoryblokProvider>
      </body>
    </html>
  );
}
