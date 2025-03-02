"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ReactNode, useEffect, useState } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider
