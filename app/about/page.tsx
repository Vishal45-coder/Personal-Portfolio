import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Certifications from '@/components/Certifications'
import Footer from '@/components/Footer'
import { Container, PageHeader, Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'About | Vishal Raavi',
  description:
    'Experience, certifications, and education for Vishal Raavi, a Software Security Engineer with the OSCP and an M.Eng. in Cybersecurity from the University of Maryland.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <PageHeader
            eyebrow="About"
            title="Security engineer who ships the code as well as the findings"
          >
            <div className="mt-4">
              <About />
            </div>
          </PageHeader>

          <Section eyebrow="Career" title="Experience">
            <Experience />
          </Section>

          <Section eyebrow="Credentials" title="Certifications">
            <Certifications />
          </Section>

          <Section eyebrow="Academic" title="Education">
            <Education />
          </Section>
        </Container>
      </main>
      <Footer />
    </>
  )
}
