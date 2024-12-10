'use client'

import { useState, useEffect, useRef } from 'react'

interface Post {
  slug: string
  title: string
  date: string
  category: string
}

interface SearchProps {
  allPosts: Post[]
}

export default function Search({ allPosts }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const categories = Array.from(new Set(allPosts.map(post => post.category)))

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const filteredPosts = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || post.category === selectedCategory)
    )
    window.dispatchEvent(new CustomEvent('filterPosts', { detail: filteredPosts }))
  }, [searchTerm, selectedCategory, allPosts])

  return (
    <div className="flex space-x-4 items-center mb-8">
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Search writings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 text-lg border-2 border-black dark:border-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 bg-transparent font-fancy"
        />
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="px-4 py-2 text-lg border-2 border-black dark:border-white bg-transparent font-fancy min-w-[200px] text-left"
        >
          {selectedCategory || "Filter Category"}
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-black border-2 border-black dark:border-white shadow-lg">
            <button
              onClick={() => {
                setSelectedCategory('')
                setIsDropdownOpen(false)
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 font-fancy"
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setIsDropdownOpen(false)
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 font-fancy"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

