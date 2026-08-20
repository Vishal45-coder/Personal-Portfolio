import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, PageHeader } from '@/components/Section'
import { PostMeta } from '@/components/PostMeta'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Vishal Raavi',
  description:
    'Writing on offensive security practice, certifications including the OSCP, and application security findings worth documenting.',
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <PageHeader
            eyebrow="Blog"
            title="Notes from practice"
            intro="Writing on certifications, offensive security practice, and the application security work I want to remember in detail later."
          />

          <ul className="grid gap-4 pb-14">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="card p-6 block group">
                  <PostMeta post={post} className="mb-2.5" />

                  <h2 className="text-xl font-bold tracking-tight text-c-text leading-snug mb-2 transition-colors duration-150 group-hover:text-c-cyan">
                    {post.title}
                  </h2>

                  <p className="text-c-sub leading-relaxed mb-4">{post.excerpt}</p>

                  <ul className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <li key={tag} className="tag">{tag}</li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <Footer />
    </>
  )
}
