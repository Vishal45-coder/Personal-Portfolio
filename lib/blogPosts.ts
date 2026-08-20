export interface BlogSection {
  heading?: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  status: 'published' | 'draft'
  excerpt: string
  tags: string[]
  sections: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'oscp-journey',
    title: 'My OSCP Journey',
    date: '2026-08-19',
    status: 'published',
    excerpt:
      'From security fundamentals to OffSec Certified Professional — the mindset shift, the workflow, and what actually moved the needle.',
    tags: ['OSCP', 'Penetration Testing', 'Career'],
    sections: [
      {
        heading: 'From Security Fundamentals to OSCP',
        paragraphs: [
          'Started the PEN-200 path from security fundamentals and gradually built hands-on confidence across reconnaissance, web exploitation, Linux and Windows privilege escalation, password attacks, tunneling, pivoting, and Active Directory.',
        ],
      },
      {
        bullets: [
          'Learned to work through machines as complete attack paths rather than isolated vulnerabilities, moving from enumeration and initial access to privilege escalation, credential discovery, lateral movement, and post-exploitation.',
          'Developed my own repeatable workflow using BloodHound, Impacket, Chisel, NetExec, WinPEAS, LinPEAS, msfvenom, Burp Suite, Nmap, and Wireshark, using tools to support enumeration and validation rather than relying on a single automated path.',
          'Earned the OSCP in 2026 after extensive hands-on practice, with the biggest improvement being a more methodical approach to enumeration, troubleshooting failed paths, and revisiting assumptions when an exploit or privilege-escalation route did not work.',
          'Continued practicing hands-on CTF and OSCP lab boxes across web, Linux, Windows, and Active Directory environments to strengthen exploitation, privilege escalation, credential attacks, pivoting, and lateral movement.',
        ],
      },
    ],
  },
  {
    slug: 'database-vulnerabilities',
    title: 'Database Vulnerabilities',
    date: '2026-08-19',
    status: 'draft',
    excerpt:
      'A closer look at common database-layer vulnerabilities — SQL injection, misconfigurations, and privilege escalation paths. Coming soon.',
    tags: ['SQL Injection', 'Database Security'],
    sections: [
      {
        paragraphs: [
          'This post is still being written. Check back soon for a deeper look at database-layer vulnerabilities and how to find and fix them.',
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
