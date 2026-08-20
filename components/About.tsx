export default function About() {
  return (
    <section id="about" className="py-10">
      <h2 className="text-xl font-semibold text-c-text mb-4">About</h2>
      <div className="space-y-4 text-c-sub leading-relaxed max-w-2xl">
        <p>
          I&apos;m an M.Eng. graduate in Cybersecurity (GPA: 3.88/4.0) from the University of
          Maryland. I work as a Software Security Engineer, embedding application security into
          the secure SDLC — reviewing attack surface, trust boundaries, and externally exposed
          functionality across the systems I help build.
        </p>
        <p>
          Day to day, that means manual and dynamic testing with Burp Suite across authentication,
          authorization, session handling, and business logic; OWASP Top 10 reviews and
          remediation; and threat modeling across frontend/backend data flows and service
          integrations. I&apos;m also an OffSec Certified Professional (OSCP), with prior
          experience assessing 100+ production web applications and REST APIs at Sathayush
          Technologies.
        </p>
        <p>
          I still build the systems I secure — React.js, Flask, Python, REST APIs, and Docker —
          because the best security reviews come from understanding how software is actually
          constructed, not just how it fails.
        </p>
      </div>
    </section>
  )
}
