'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { PostMeta } from './PostMeta'
import type { PostSummary } from '@/lib/blog'

/** Below this many posts the whole list fits on screen, so a filter would
 *  add clutter without helping anyone find anything. */
const MIN_POSTS_FOR_FILTER = 6

export function BlogList({ posts }: { posts: PostSummary[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  // Tags ordered by how often they are used, then alphabetically.
  const tags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const post of posts) {
      for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
    return [...counts.entries()].sort(
      ([tagA, countA], [tagB, countB]) => countB - countA || tagA.localeCompare(tagB)
    )
  }, [posts])

  const showFilter = posts.length >= MIN_POSTS_FOR_FILTER && tags.length > 1
  const visiblePosts =
    showFilter && activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts

  return (
    <div className="pb-14">
      {showFilter && (
        <div className="mb-8">
          <h2 className="sr-only">Filter posts by tag</h2>
          <ul className="flex flex-wrap gap-2">
            <li>
              <FilterChip
                label="All"
                count={posts.length}
                active={activeTag === null}
                onClick={() => setActiveTag(null)}
              />
            </li>
            {tags.map(([tag, count]) => (
              <li key={tag}>
                <FilterChip
                  label={tag}
                  count={count}
                  active={activeTag === tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Announce the result count to screen readers when filtering. */}
      {showFilter && activeTag && (
        <p className="sr-only" role="status">
          {visiblePosts.length} posts tagged {activeTag}
        </p>
      )}

      <ul className="grid gap-4">
        {visiblePosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="card p-6 block group">
              <PostMeta post={post} className="mb-2.5" />

              <h3 className="text-xl font-bold tracking-tight text-c-text leading-snug mb-2 transition-colors duration-150 group-hover:text-c-cyan">
                {post.title}
              </h3>

              <p className="text-c-sub leading-relaxed mb-4">{post.excerpt}</p>

              <ul className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className={`tag ${showFilter && tag === activeTag ? 'tag-accent' : ''}`}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors duration-150"
      style={{
        border: `1px solid ${active ? 'var(--c-cyan-border)' : 'var(--c-line)'}`,
        background: active ? 'var(--c-cyan-tint)' : 'var(--overlay-xs)',
        color: active ? 'var(--c-cyan)' : 'var(--c-sub)',
      }}
    >
      {label}
      <span className="font-mono text-xs text-c-muted">{count}</span>
    </button>
  )
}
