import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container } from '@/components/Section'
import { PostMeta } from '@/components/PostMeta'
import { getPost, getPostSlugs } from '@/lib/blog'

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post not found | Vishal Raavi' }
  return {
    title: `${post.title} | Vishal Raavi`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <article className="pt-10 pb-6 sm:pt-14 max-w-2xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-c-muted mb-8 transition-colors duration-150 hover:text-c-cyan"
            >
              <ArrowLeft size={14} /> All posts
            </Link>

            <PostMeta post={post} className="mb-3" />

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-c-text leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-c-sub leading-relaxed mb-5">{post.excerpt}</p>

            {post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5 pb-8 mb-8 border-b">
                {post.tags.map((tag) => (
                  <li key={tag} className="tag">{tag}</li>
                ))}
              </ul>
            )}

            {/* Rendered from content/blog/<slug>.md at build time. */}
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
        </Container>
      </main>
      <Footer />
    </>
  )
}
