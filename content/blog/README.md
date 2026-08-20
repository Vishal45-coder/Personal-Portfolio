# Writing a blog post

## Steps

1. Copy `_TEMPLATE.md` to `content/blog/your-post-slug.md`.
2. Fill in the frontmatter at the top of the file.
3. Write the post in Markdown.
4. Run `npm run dev` and open http://localhost:3000/blog to preview.
5. Commit and push. The post is generated at build time.

The filename becomes the URL. `oscp-journey.md` is published at `/blog/oscp-journey`.
Use lowercase words separated by hyphens, and do not rename the file after publishing,
because that breaks any existing links to it.

Files starting with `_` are ignored, so `_TEMPLATE.md` never appears on the site.

## Frontmatter

| Field | Required | Notes |
| --- | --- | --- |
| `title` | Yes | Post heading, browser tab, and link previews. |
| `date` | Yes | `YYYY-MM-DD`. Posts are sorted newest first. |
| `excerpt` | Yes | One or two sentences. Used on the blog list and as the search description. |
| `tags` | No | A list. Shown on the post and the blog list. |
| `draft` | No | `true` marks the post "In progress". Remove the line to publish. |

Reading time is calculated automatically. Do not set it.

## Images

Put files in `public/blog/` and reference them with a leading slash:

```markdown
![Alt text describing the image](/blog/your-image.png)
```

Redact anything sensitive before committing. Everything in `public/` is served publicly
and stays in git history.

## What is supported

Headings, bold, italics, links, bullet and numbered lists, code blocks with syntax
highlighting, inline code, images, tables, blockquotes, and horizontal rules. Raw HTML also
works when Markdown is not enough.

See `_TEMPLATE.md` for an example of each.

## Where the code lives

- `lib/blog.ts` reads these files and converts Markdown to HTML.
- `app/blog/page.tsx` is the list page.
- `app/blog/[slug]/page.tsx` is the post page.
- The `.prose` block in `app/globals.css` styles the rendered Markdown.
