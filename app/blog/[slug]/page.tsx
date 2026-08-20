import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { blogPosts, getBlogPost } from '@/lib/blogPosts'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'Post Not Found | Vishal Raavi' }
  return {
    title: `${post.title} | Vishal Raavi`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <main>
      <Navbar />
      <article className="max-w-2xl mx-auto px-6 py-10">
        <Link href="/blog" className="text-sm text-c-muted underline underline-offset-2 transition-colors duration-150 hover:text-c-cyan">
          ← Back to Blog
        </Link>

        <div className="mt-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-c-muted">{post.date}</span>
            {post.status === 'draft' && <span className="text-sm text-c-muted">· Coming Soon</span>}
          </div>
          <h1 className="text-2xl font-semibold text-c-text mb-2">{post.title}</h1>
          <p className="text-sm text-c-sub leading-relaxed">{post.excerpt}</p>
        </div>

        <div className="space-y-6">
          {post.sections.map((section, i) => (
            <div key={i} className="space-y-3">
              {section.heading && (
                <h2 className="font-medium text-c-text">{section.heading}</h2>
              )}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="text-sm text-c-sub leading-relaxed">{p}</p>
              ))}
              {section.bullets && (
                <ul className="space-y-1.5 list-disc list-outside pl-5">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-c-sub leading-relaxed">{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </article>
      <Footer />
    </main>
  )
}
