import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6">
        <Hero />
        <Skills />
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
