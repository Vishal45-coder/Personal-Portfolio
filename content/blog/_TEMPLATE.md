---
title: Your Post Title
date: 2026-09-01
excerpt: One or two sentences shown on the blog list and used as the page description for search and link previews.
tags:
  - Tag one
  - Tag two
draft: true
---

Files starting with an underscore are ignored, so this template never appears on the site.
To write a post, copy this file to `content/blog/your-post-slug.md`. The filename becomes the
URL, so `your-post-slug.md` is published at `/blog/your-post-slug`.

Set `draft: true` while you work on it. The post still appears in the list marked "In progress"
so you can preview it. Delete the `draft` line when it is ready. Delete this intro text too.

## Headings

Use `##` for section headings and `###` for subsections. Do not use `#`, because the post title
already provides the top level heading. Every heading gets a link anchor automatically.

### A subsection

Regular paragraphs need a blank line between them. Use **bold** for emphasis, *italics*
sparingly, and `inline code` for commands, file paths, parameters, and function names.

Links look like [this](https://example.com). External links open in a new tab automatically.

## Lists

- A bullet point
- Another bullet point
  - An indented sub point
- Bullets are best for findings, steps, and takeaways

1. A numbered step
2. A second step
3. Numbered lists are best when order matters

## Code blocks

Put the language after the opening backticks to get syntax highlighting. Highlighting adapts to
light and dark mode automatically.

```bash
nmap -p- --min-rate 2000 -T4 -oA scans/all-ports 10.10.10.10
```

```python
import requests

def check_header(url: str) -> str | None:
    """Return the CSP header if the target sets one."""
    response = requests.get(url, timeout=10)
    return response.headers.get("Content-Security-Policy")
```

```http
GET /api/account?id=1042 HTTP/1.1
Host: target.example.com
Cookie: session=REDACTED
```

Useful languages: `bash`, `python`, `javascript`, `typescript`, `json`, `yaml`, `sql`, `http`,
`php`, `powershell`, `diff`, `text`.

## Images

Put image files in `public/blog/` and reference them with a leading slash. The path
`public/blog/burp-repeater.png` is written as `/blog/burp-repeater.png`.

![Describe the image here for screen readers and for when it fails to load](/blog/example.svg)

Always write real alt text. For a caption underneath, use raw HTML:

<figure>
  <img src="/blog/example.svg" alt="Burp Repeater showing the modified request">
  <figcaption>The IDOR reproduced in Burp Repeater.</figcaption>
</figure>

Redact anything sensitive in screenshots before committing them. Images in `public/` are served
publicly and permanently.

## Tables

| Finding | Severity | Status |
| --- | --- | --- |
| IDOR on account endpoint | High | Fixed |
| Missing CSP header | Low | Accepted |

## Quotes and separators

> Use a blockquote for a callout, a key takeaway, or a quoted advisory.

Use three dashes for a horizontal rule when you need a hard break between sections:

---

That is everything. Write the post, save the file, and it appears on the site.
