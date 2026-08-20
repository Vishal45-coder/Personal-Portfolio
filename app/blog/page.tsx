import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Projects from '@/components/Projects'
import { blogPosts } from '@/lib/blogPosts'

export const metadata: Metadata = {
  title: 'Blog | Vishal Raavi',
  description: 'Notes on security research, certifications, and hands-on offensive/defensive work.',
}

export default function BlogIndexPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-xl font-semibold text-c-text mb-6">Blog</h1>

        <div className="space-y-6 mb-12">
          {blogPosts.map((post) => (
            <div key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h2 className="font-medium text-c-text transition-colors duration-150 group-hover:text-c-cyan">
                    {post.title}
                  </h2>
                  <span className="text-sm text-c-muted flex-shrink-0">
                    {post.status === 'draft' ? 'Coming Soon' : post.date}
                  </span>
                </div>
                <p className="text-sm text-c-sub leading-relaxed">{post.excerpt}</p>
              </Link>
            </div>
          ))}
        </div>

        <Projects />
      </div>
      <Footer />
    </main>
  )
}
