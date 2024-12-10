# Minimalistic Writing Posts

A static blog site built with Next.js, featuring a minimalist old/classicy design and easy content management.

## Technologies Used

- Next.js 13 (App Router)
- React
- TypeScript
- Tailwind CSS
- MDX for content
- next-themes for dark mode

## Getting Started

1. Clone the repository
2. Install dependencies: `bun install`
3. Run the development server: `bun run dev`

## Adding New Pages

1. Create a new Markdown file in the `posts` directory
2. Add frontmatter with `title`, `date`, and `category`
3. Write your content in Markdown

Example:
```md
---
title: "New Post Title"
date: "2023-10-15"
category: "Your Category"
---

Your content in Markdown here...
```

## Generating the Static Site

To generate the static site, run the following command:

```bash
bun run build
```

This will create a `.next` folder with the static files. You can then serve these files using a static file server.

## Deployment

After generating the static site, you can deploy it to any static file hosting service, such as Vercel, Netlify, or GitHub Pages.


