import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { Container, Section } from '@/components/Section'
import { ProjectCard } from '@/components/ProjectCard'
import { PostMeta } from '@/components/PostMeta'
import { projects } from '@/lib/content'
import { blogPosts } from '@/lib/blogPosts'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Hero />

          <Section
            id="projects"
            eyebrow="Selected work"
            title="Projects"
            intro="Security engineering work where I built the system and then assessed it as a target."
            action={{ label: 'All projects', href: '/projects' }}
          >
            <div className="grid gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} compact />
              ))}
            </div>
          </Section>

          <Section
            id="writing"
            eyebrow="Writing"
            title="From the blog"
            intro="Notes on certifications, offensive security practice, and findings worth writing down."
            action={{ label: 'All posts', href: '/blog' }}
          >
            <ul className="grid sm:grid-cols-2 gap-4">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="card p-5 h-full flex flex-col group">
                    <PostMeta post={post} className="mb-2" />
                    <h3 className="font-bold text-c-text leading-snug mb-2 transition-colors duration-150 group-hover:text-c-cyan">
                      {post.title}
                    </h3>
                    <p className="text-sm text-c-sub leading-relaxed">{post.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="skills"
            eyebrow="Capabilities"
            title="Skills"
            intro="Security specialisms first, followed by the engineering and infrastructure work that supports them."
          >
            <Skills />
          </Section>

          <Section
            id="contact"
            eyebrow="Get in touch"
            title="Contact"
            intro="Open to full time roles in application security, product security, and cloud security."
          >
            <Contact />
          </Section>
        </Container>
      </main>
      <Footer />
    </>
  )
}
