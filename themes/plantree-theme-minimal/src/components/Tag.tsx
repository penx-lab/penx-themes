import { cn } from '@plantreexyz/utils'
import { slug } from 'github-slugger'
import Link from 'next/link'

interface Props {
  text: string
  className?: string
}

const Tag = ({ text, className }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={cn(
        'mr-3 text-base font-medium text-brand-500 hover:text-primary-600 dark:hover:text-primary-400',
        className,
      )}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag