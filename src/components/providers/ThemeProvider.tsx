"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ReactNode, useEffect, useState } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider attribute="data-theme" defaultTheme="dark" enableSystem={true}>
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider
