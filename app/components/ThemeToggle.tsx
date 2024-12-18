'use client'

import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-800" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-400" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
