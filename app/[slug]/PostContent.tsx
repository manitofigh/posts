'use client'

import Link from 'next/link'
import { Suspense, ReactNode } from 'react'

type PostContentProps = {
  title: string
  date: string
  children: ReactNode
}

export default function PostContent({ title, date, children }: PostContentProps) {
  return (
    <>
      <Link href="/" className="text-lg hover:underline font-fancy">&larr; Back to Home</Link>
      <h1 className="font-fancy text-4xl mt-8 mb-4">{title}</h1>
      <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">{date}</p>
      <div className="text-xl leading-relaxed">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </div>
    </>
  )
}
