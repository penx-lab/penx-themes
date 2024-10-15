import { ReactNode } from 'react'
import { Post } from '@plantreexyz/types'
import { formatDate } from '@plantreexyz/utils'
import Image from '../components/Image'
import Link from '../components/Link'
import PageTitle from '../components/PageTitle'
import { PostCreation } from '../components/PostCreation/PostCreation'
import SectionContainer from '../components/SectionContainer'

interface LayoutProps {
  post: Post
  children: ReactNode
  next?: Post
  prev?: Post
}

export function PostDetail({ post, next, prev, children }: LayoutProps) {
  return (
    <SectionContainer>
      <article className="mt-20  mx-auto lg:max-w-3xl">
        <header className="space-y-4 pb-4 text-center">
          <PageTitle>{post.title}</PageTitle>
          <dl className="flex items-center justify-center gap-2">
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time>{formatDate(post.updatedAt)}</time>
            </dd>
            <dd>·</dd>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              {post.readingTime.text}
            </dd>
          </dl>
        </header>

        {!!post.image && (
          <Image
            src={post.image || ''}
            alt=""
            width={1000}
            height={800}
            className="object-cover w-full max-h-96 rounded-2xl"
          />
        )}

        <div className="grid-rows-[auto_1fr]">
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
              <PostCreation post={post} canRead />
            </div>
          </div>
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev?.slug && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/posts/${prev.slug}`}
                    className="text-brand-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next?.slug && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/posts/${next.slug}`}
                    className="text-brand-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}