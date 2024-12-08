'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Node } from 'slate'
import { Post, PostType } from '@penxio/types'
import { cn, formatDate } from '@penxio/utils'

interface PostItemProps {
  post: Post
  receivers?: string[]
  ContentRender: (props: { content: any[]; className?: string }) => JSX.Element
  PostActions?: (props: {
    post: Post
    receivers?: string[]
    className?: string
  }) => JSX.Element
}

export function PostItem({
  post,
  PostActions,
  receivers = [],
  ContentRender,
}: PostItemProps) {
  const { slug, title } = post
  const { address = '' } = post.user
  const name = post.user.name || address.slice(0, 6) + '...' + address.slice(-4)

  const params = useSearchParams()
  const type = params.get('type')

  if (type === 'photos' && post.type !== PostType.IMAGE) return null
  if (type === 'notes' && post.type !== PostType.NOTE) return null
  if (type === 'articles' && post.type !== PostType.ARTICLE) return null

  const getTitle = () => {
    if (post.type === PostType.IMAGE) return <div className="">{title}</div>
    if (post.type === PostType.NOTE) return <div className="">a note</div>
    if (post.type === PostType.ARTICLE) {
      return <div className="">an article</div>
    }
    return <div></div>
  }

  const getContent = () => {
    if (post.type === PostType.IMAGE) {
      return (
        <img src={post.image!} alt="" className="w-full h-auto rounded-lg" />
      )
    }

    if (post.type === PostType.NOTE) {
      return <div className="text-foreground/80">000{post.title}</div>
    }

    const nodes: any[] =
      typeof post.content === 'string' ? JSON.parse(post.content) : post.content
    const str = nodes.map((node) => Node.string(node)).join('')

    return (
      <Link href={`/posts/${slug}`} className="space-y-2">
        <div className="text-2xl font-bold hover:scale-105 transition-all origin-left">
          {post.title}
        </div>
        {str && (
          <div className="text-foreground/80 hover:text-foreground transition-all hover:scale-105 break-words break-all">
            {str.slice(0, 260)}...
          </div>
        )}
      </Link>
    )
  }
  const getAvatar = () => {
    if (post.user.image) {
      return (
        <img
          className="h-6 w-6 rounded-full"
          src={post.user.image || ''}
          alt=""
        />
      )
    }

    return (
      <div
        className={cn(
          'bg-red-300 h-6 w-6 rounded-full flex-shrink-0',
          generateGradient(post.user.displayName || post.user.name),
        )}
      ></div>
    )
  }

  return (
    <div className="flex flex-col gap-3 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          {getAvatar()}
          <div className="font-medium">{name}</div>
          <div className="text-foreground/50 text-sm">posted</div>
          {getTitle()}
        </div>
        <time className="text-xs text-foreground/50">
          {formatDate(post.updatedAt)}
        </time>
      </div>

      {getContent()}

      {PostActions && <PostActions post={post} receivers={receivers} />}
    </div>
  )
}

function hashCode(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

function getFromColor(i: number) {
  const colors = [
    'from-red-500',
    'from-yellow-500',
    'from-green-500',
    'from-blue-500',
    'from-indigo-500',
    'from-purple-500',
    'from-pink-500',
    'from-red-600',
    'from-yellow-600',
    'from-green-600',
    'from-blue-600',
    'from-indigo-600',
    'from-purple-600',
    'from-pink-600',
  ]
  return colors[Math.abs(i) % colors.length]
}

function getToColor(i: number) {
  const colors = [
    'to-red-500',
    'to-yellow-500',
    'to-green-500',
    'to-blue-500',
    'to-indigo-500',
    'to-purple-500',
    'to-pink-500',
    'to-red-600',
    'to-yellow-600',
    'to-green-600',
    'to-blue-600',
    'to-indigo-600',
    'to-purple-600',
    'to-pink-600',
  ]
  return colors[Math.abs(i) % colors.length]
}

function generateGradient(walletAddress: string) {
  if (!walletAddress) return `bg-gradient-to-r to-pink-500 to-purple-500`
  const hash = hashCode(walletAddress)
  const from = getFromColor(hash)
  const to = getToColor(hash >> 8)
  return `bg-gradient-to-r ${from} ${to}`
}
