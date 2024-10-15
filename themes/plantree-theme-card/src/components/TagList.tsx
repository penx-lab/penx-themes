'use client'

import { slug } from 'github-slugger'
import { usePathname } from 'next/navigation'
import { Tag } from '@plantreexyz/types'
import Link from './Link'

interface PostListWithTagProps {
  tags: Tag[]
}

export function TagList({ tags = [] }: PostListWithTagProps) {
  const pathname = usePathname()

  return (
    <ul className="flex flex-wrap gap-x-5 w-full justify-center">
      {tags.map((t) => {
        return (
          <li key={t.id} className="my-3">
            {decodeURI(pathname.split('/tags/')[1]) === slug(t.name) ? (
              <h3 className="inline py-2 text-brand-500 dark:text-gray-800">
                #{`${t.name}`}
              </h3>
            ) : (
              <Link
                href={`/tags/${slug(t.name)}`}
                className="py-2 text-gray-500 hover:text-brand-500 dark:text-gray-800 dark:hover:text-brand-500 rounded-full"
                aria-label={`View posts tagged ${t.name}`}
              >
                #{`${t.name}`}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}