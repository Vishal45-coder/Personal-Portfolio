import { aboutParagraphs } from '@/lib/content'

export default function About() {
  return (
    <div className="space-y-4 max-w-2xl">
      {aboutParagraphs.map((paragraph, i) => (
        <p key={i} className="text-c-sub leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  )
}
