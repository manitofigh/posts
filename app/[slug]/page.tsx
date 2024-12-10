import { getPostData, getAllPostSlugs } from '@/lib/posts'
import PostContent from './PostContent'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const paths = getAllPostSlugs()
  return paths
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug)
  
  return (
    <article className="prose prose-lg dark:prose-invert mx-auto">
      <PostContent 
        title={postData.title}
        date={postData.date}
      >
        <MDXRemote source={postData.content} />
      </PostContent>
    </article>
  )
}
