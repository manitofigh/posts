import { getPostData, getAllPostSlugs } from '@/lib/posts'
import PostContent from './PostContent'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

interface PageProps {
  params: {
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  const paths = await getAllPostSlugs()
  return paths.map((path) => ({
    slug: path.params.slug,
  }))
}

export default async function Post({
  params,
  searchParams,
}: PageProps) {
  const postData = await getPostData(params.slug)
  
  return (
    <article className="prose dark:prose-invert mx-auto">
      <PostContent 
        title={postData.title}
        date={postData.date}
      >
        <MDXRemote source={postData.content} />
      </PostContent>
    </article>
  )
}
