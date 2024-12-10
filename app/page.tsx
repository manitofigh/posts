import { getSortedPostsData } from '@/lib/posts'
import Search from '@/components/Search'
import PostList from '@/components/PostList'

export default function Home() {
  const allPosts = getSortedPostsData()

  return (
    <div>
      <Search allPosts={allPosts} />
      <PostList initialPosts={allPosts} />
    </div>
  )
}

