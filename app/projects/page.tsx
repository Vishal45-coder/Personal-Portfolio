import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, PageHeader } from '@/components/Section'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Projects | Vishal Raavi',
  description:
    'Security engineering projects covering AWS cloud security assessment, threat modeling with STRIDE and DREAD, infrastructure hardening, and centralized security monitoring.',
}

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <PageHeader
            eyebrow="Projects"
            title="Systems I built, then tested as a target"
            intro="Each project was designed, deployed, and then assessed end to end. The write ups cover the problem, the work, the measured result, and the controls that came out of it."
          />

          <div className="grid gap-5 pb-14">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
