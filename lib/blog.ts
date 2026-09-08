import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings, { type Options as AutolinkOptions } from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

// Wraps each heading's text in an anchor linking to its own id.
const autolinkOptions: AutolinkOptions = {
  behavior: 'wrap',
  properties: { className: ['heading-anchor'] },
}

/** Fields you set in the frontmatter block at the top of each .md file. */
interface Frontmatter {
  title: string
  date: string
  excerpt: string
  tags?: string[]
  draft?: boolean
}

export interface PostSummary {
  slug: string
  title: string
  date: string
  displayDate: string
  excerpt: string
  tags: string[]
  draft: boolean
  readingTime: string
}

export interface Post extends PostSummary {
  html: string
}

function formatDate(date: string): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parsed)
}

function readingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

function readPostFile(slug: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), 'utf8')
  const { data, content } = matter(raw)
  const frontmatter = data as Frontmatter

  const missing = (['title', 'date', 'excerpt'] as const).filter((key) => !frontmatter[key])
  if (missing.length > 0) {
    throw new Error(`content/blog/${slug}.md is missing frontmatter: ${missing.join(', ')}`)
  }

  const draft = frontmatter.draft === true

  const summary: PostSummary = {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    displayDate: formatDate(frontmatter.date),
    excerpt: frontmatter.excerpt,
    tags: frontmatter.tags ?? [],
    draft,
    // A stub post has no meaningful reading time, so leave it off.
    readingTime: draft ? '' : readingTime(content),
  }

  return { summary, content }
}

/** Markdown files that are documentation for the author, not posts. */
function isPostFile(file: string): boolean {
  return file.endsWith('.md') && !file.startsWith('_') && file.toLowerCase() !== 'readme.md'
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(isPostFile)
    .map((file) => file.replace(/\.md$/, ''))
}

/** All posts, newest first. Drafts are included and flagged. */
export function getAllPosts(): PostSummary[] {
  return getPostSlugs()
    .map((slug) => readPostFile(slug).summary)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!getPostSlugs().includes(slug)) return null

  const { summary, content } = readPostFile(slug)

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    // allowDangerousHtml + rehypeRaw let you drop raw HTML into a post when
    // markdown alone is not enough.
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, autolinkOptions)
    .use(rehypePrettyCode, {
      // Note: the option is `theme`, not `themes`. An object enables dual
      // themes, emitting --shiki-light and --shiki-dark on every token.
      theme: { light: 'github-light', dark: 'one-dark-pro' },
      keepBackground: false,
      defaultLang: 'text',
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return { ...summary, html: String(file) }
}
