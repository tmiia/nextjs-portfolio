"use client"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import styles from './ThemeSwitcher.module.scss'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, []);

  if (!mounted) {
    return null
  }

  const handleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <button onClick={handleTheme} className={styles.themeSwitcher}>
      <span className="sr-only">Click to switch theme to {theme == 'dark' ? 'light' : 'dark'}</span>
    </button>
  )
}

export default ThemeSwitcher
