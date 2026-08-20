import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container } from '@/components/Section'
import { PostMeta } from '@/components/PostMeta'
import { blogPosts, getBlogPost } from '@/lib/blogPosts'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'Post not found | Vishal Raavi' }
  return {
    title: `${post.title} | Vishal Raavi`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
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

            <ul className="flex flex-wrap gap-1.5 pb-8 mb-8 border-b">
              {post.tags.map((tag) => (
                <li key={tag} className="tag">{tag}</li>
              ))}
            </ul>

            <div className="space-y-8">
              {post.sections.map((section, i) => (
                <section key={i}>
                  {section.heading && (
                    <h2 className="text-xl font-bold tracking-tight text-c-text mb-3">
                      {section.heading}
                    </h2>
                  )}

                  {section.paragraphs?.map((paragraph, j) => (
                    <p key={j} className="text-c-sub leading-relaxed mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-2.5">
                      {section.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-2.5 text-c-sub leading-relaxed">
                          <span aria-hidden="true" className="text-c-cyan flex-shrink-0 mt-1">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  )
}
