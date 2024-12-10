import Link from 'next/link'

interface PostCardProps {
  post: {
    slug: string
    title: string
    date: string
    category: string
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/${post.slug}`} className="block">
      <div className="bg-white/50 dark:bg-black border border-gray-200 dark:border-gray-700 p-4 rounded-md 
          hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 
          transition-all duration-200">
        <h2 className="text-xl mb-2 font-fancy">{post.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{post.date}</p>
        <span className="text-sm bg-white/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
          px-2 py-1 rounded-full">
          {post.category}
        </span>
      </div>
    </Link>
  )
}
