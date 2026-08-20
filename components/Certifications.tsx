import { ShieldCheck } from 'lucide-react'
import { certifications } from '@/lib/content'

export default function Certifications() {
  return (
    <div className="space-y-6">
      {certifications.map((credential) => {
        const earned = credential.status === 'Earned'
        return (
          <article
            key={credential.name}
            className="grid md:grid-cols-[10rem_1fr] gap-2 md:gap-8"
          >
            <p
              className="font-mono text-xs md:pt-1"
              style={{ color: earned ? 'var(--c-cyan)' : 'var(--c-muted)' }}
            >
              {credential.status}
              {credential.year && ` ${credential.year}`}
            </p>

            <div>
              <h3 className="font-semibold text-c-text leading-snug flex items-start gap-2">
                {earned && (
                  <ShieldCheck size={16} className="text-c-cyan flex-shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <span>{credential.name}</span>
              </h3>
              <p className="text-sm text-c-muted mt-1">
                {credential.issuer}
                {credential.detail && ` · ${credential.detail}`}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
