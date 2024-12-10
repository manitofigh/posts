'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait until mounted on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky-header border-b border-gray-400 dark:border-gray-700 py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <Link href="/" className="text-3xl font-fancy">
            Mani Tofigh 
          </Link>
          <div className="text-sm font-fancy">
            {new Date().getFullYear()} ©
          </div>
        </div>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-4 py-2 text-lg font-fancy border-t border-b border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
        >
          {mounted ? (theme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode') : 'Theme'}
        </button>
      </div>
    </header>
  )
}
