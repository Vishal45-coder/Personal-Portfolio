import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, PageHeader } from '@/components/Section'
import { BlogList } from '@/components/BlogList'
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

          <BlogList posts={posts} />
        </Container>
      </main>
      <Footer />
    </>
  )
}
