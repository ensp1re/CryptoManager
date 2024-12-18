'use client';

import { Suspense, useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'

export default function Home() {

  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  )
}

