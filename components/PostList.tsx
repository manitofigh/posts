'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  date: string
  category: string
  content: string
}

interface PostListProps {
  initialPosts: Post[]
}

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState(initialPosts)

  useEffect(() => {
    const handleFilterPosts = (event: CustomEvent<Post[]>) => {
      setPosts(event.detail)
    }

    window.addEventListener('filterPosts', handleFilterPosts as EventListener)

    return () => {
      window.removeEventListener('filterPosts', handleFilterPosts as EventListener)
    }
  }, [])

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/${post.slug}`} className="block group">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors duration-300" />
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full" />
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full" />
              <div className="p-6 space-y-4">
                <h2 className="text-4xl font-bold font-fancy">{post.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                <p className="line-clamp-3 font-cormorant-garamond">{post.content}</p>
                <span className="inline-block px-3 py-1 text-sm font-fancy border-t border-b border-black dark:border-white">
                  {post.category}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

