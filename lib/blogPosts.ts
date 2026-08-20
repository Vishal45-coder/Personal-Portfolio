export interface BlogSection {
  heading?: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  displayDate: string
  status: 'published' | 'draft'
  readingTime: string
  excerpt: string
  tags: string[]
  sections: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'oscp-journey',
    title: 'My OSCP Journey',
    date: '2026-08-19',
    displayDate: 'August 2026',
    status: 'published',
    readingTime: '4 min read',
    excerpt:
      'What actually changed between starting PEN-200 and passing the exam. Less about tooling than about method, and about treating every box as a full attack path.',
    tags: ['OSCP', 'Penetration testing', 'Career'],
    sections: [
      {
        heading: 'Where I started',
        paragraphs: [
          'I began the PEN-200 path from fundamentals and worked up through reconnaissance, web exploitation, Linux and Windows privilege escalation, password attacks, tunneling, pivoting, and Active Directory. The early labs were slow. The value was not in finishing them quickly, it was in building a process I could repeat under pressure.',
        ],
      },
      {
        heading: 'What changed my results',
        bullets: [
          'I stopped treating machines as a list of isolated vulnerabilities and started treating each one as a full attack path, from enumeration and initial access through privilege escalation, credential discovery, lateral movement, and post exploitation.',
          'I built a repeatable workflow around BloodHound, Impacket, Chisel, NetExec, WinPEAS, LinPEAS, msfvenom, Burp Suite, Nmap, and Wireshark. Tools support enumeration and validation. They do not replace either one.',
          'The largest single improvement was method rather than tooling. Careful enumeration, disciplined troubleshooting when something failed, and going back to question an assumption were worth more than any specific exploit.',
          'When a privilege escalation route stalled, the answer was almost always something I had already collected and not read closely enough.',
        ],
      },
      {
        heading: 'After the exam',
        paragraphs: [
          'I passed in 2026. I still run CTF and lab boxes across web, Linux, Windows, and Active Directory environments to keep exploitation, privilege escalation, credential attacks, pivoting, and lateral movement current.',
          'The part that carried directly into my day job was the discipline around validation. Confirming real impact before reporting a finding is the same skill in a lab and in production.',
        ],
      },
    ],
  },
  {
    slug: 'database-vulnerabilities',
    title: 'Database Vulnerabilities',
    date: '2026-08-19',
    displayDate: '',
    status: 'draft',
    readingTime: '',
    excerpt:
      'A practical walkthrough of database layer weaknesses: injection beyond the basics, privilege and role misconfiguration, and the escalation paths they open up.',
    tags: ['SQL injection', 'Database security'],
    sections: [
      {
        paragraphs: [
          'This post is in progress. It will cover injection techniques past the standard payloads, privilege and role misconfiguration, insecure defaults, and how each one turns into a realistic escalation path, along with the fixes and detections that hold up in production.',
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
