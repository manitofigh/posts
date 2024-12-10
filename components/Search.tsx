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
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
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
    let filteredPosts = allPosts.filter((post) => {
      const searchLower = searchTerm.toLowerCase().trim()
      const titleLower = post.title.toLowerCase()
      const contentLower = post.content.toLowerCase()

      // Split search term into words
      const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0)

      // If no search term, just check category
      if (searchWords.length === 0) {
        return selectedCategory === '' || post.category === selectedCategory
      }

      // Check if all search words are found in either title or content
      const allWordsFound = searchWords.every(word => 
        titleLower.includes(word) || contentLower.includes(word)
      )

      return allWordsFound && (selectedCategory === '' || post.category === selectedCategory)
    })

    // Sort posts by date
    filteredPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    window.dispatchEvent(new CustomEvent('filterPosts', { detail: filteredPosts }))
  }, [searchTerm, selectedCategory, sortOrder, allPosts])
  return (
    <div className="flex space-x-4 items-center mb-8">
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Search Writing Posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 text-lg border-2 border-black dark:border-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 bg-transparent font-fancy"
        />
      </div>
      <button
        onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
        className="px-4 py-2 text-lg border-2 border-black dark:border-white bg-transparent font-fancy whitespace-nowrap"
      >
        {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
      </button>
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
