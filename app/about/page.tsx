import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Certifications from '@/components/Certifications'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About | Vishal Raavi',
  description:
    'Experience, education, and certifications for Vishal Raavi — Software Security Engineer, OSCP-certified, M.Eng. Cybersecurity at UMD.',
}

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6">
        <About />
        <Experience />
        <Education />
        <Certifications />
      </div>
      <Footer />
    </main>
  )
}
