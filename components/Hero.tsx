export default function Hero() {
  return (
    <section className="py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-c-text mb-2">
        Vishal Raavi
      </h1>
      <p className="text-c-sub mb-1">Software Security Engineer</p>
      <p className="text-sm text-c-muted mb-6">
        OSCP &middot; M.Eng. Cybersecurity, University of Maryland (3.88 GPA) &middot; Application &amp; Cloud Security
      </p>
      <p className="text-c-sub leading-relaxed max-w-xl mb-6">
        I secure production systems through secure SDLC integration, application security testing,
        and cloud security — and I still build the software I review, using React.js, Flask, and Docker.
      </p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <a href="/about" className="text-c-cyan hover:underline underline-offset-2">
          About me
        </a>
        <a href="#contact" className="text-c-muted hover:text-c-text hover:underline underline-offset-2">
          Contact
        </a>
        <a
          href="/Vishal_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-c-muted hover:text-c-text hover:underline underline-offset-2"
        >
          Resume
        </a>
      </div>
    </section>
  )
}
