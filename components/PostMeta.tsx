import type { BlogPost } from '@/lib/blogPosts'

/** Date, reading time and draft state for a post. Shared so every
 *  surface that lists a post renders its metadata the same way. */
export function PostMeta({ post, className = '' }: { post: BlogPost; className?: string }) {
  const meta = [post.displayDate, post.readingTime].filter(Boolean)

  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1.5 ${className}`}>
      {meta.length > 0 && (
        <span className="font-mono text-xs text-c-muted">{meta.join(' · ')}</span>
      )}
      {post.status === 'draft' && <span className="tag">In progress</span>}
    </div>
  )
}
