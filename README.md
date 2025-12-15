# Jeff Douglas Blog (Astro)

Personal blog for Jeff Douglas, migrated from Jekyll to Astro.

## Features

- 🎨 Clean, minimal design matching the original Jekyll theme
- 🌙 Dark mode with system preference detection
- 🔍 Client-side search with keyboard shortcuts (⌘/Ctrl + K)
- 📱 Fully responsive
- 📌 Pinned posts section
- 🖼️ Photo gallery in footer
- 📄 Pagination (12 posts per page)
- 🔗 Preserves original date-based URLs (`/2025/05/02/post-slug/`)

## Migration from Jekyll

### Step 1: Run the migration script

```bash
node migrate.js /path/to/jekyll/_posts ./src/content/blog
```

This will:
- Convert Jekyll frontmatter to Astro format
- Preserve date-based URLs via the `slug` field
- Convert `{% highlight %}` blocks to markdown code fences
- Mark posts with the `starred` tag as pinned

### Step 2: Copy your images

```bash
cp -r /path/to/jekyll/images/* ./public/images/
```

### Step 3: Update any broken image paths

Some older posts may reference images with different paths. Search for common patterns:
- `http://res.cloudinary.com/` → External images (keep as-is or download)
- `/images/slugs/` → Ensure these exist in `public/images/slugs/`

### Step 4: Test locally

```bash
npm install
npm run dev
```

## Project Structure

```
jeffdouglas-blog/
├── src/
│   ├── components/       # UI components
│   ├── content/
│   │   └── blog/         # Markdown posts
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro   # Homepage
│   │   ├── [...slug].astro  # Blog posts (date-based URLs)
│   │   └── page/[page].astro  # Pagination
│   └── styles/
│       └── global.css
├── public/
│   ├── images/           # All images
│   ├── CNAME             # Custom domain
│   └── favicon.ico
├── migrate.js            # Jekyll → Astro migration script
└── astro.config.mjs
```

## Writing New Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A brief description"
pubDate: "2025-12-14"
heroImage: "/images/your-image.jpg"
tags: ["tag1", "tag2"]
slug: "2025/12/14/your-post-slug"  # Optional: for date-based URL
pinned: false  # Optional: set to true for pinned posts
---

Your content here...
```

### URL Options

**Date-based URL** (matches old Jekyll structure):
```yaml
slug: "2025/12/14/your-post-slug"
```
Results in: `https://www.jeffdouglas.com/2025/12/14/your-post-slug/`

**Simple URL** (omit the slug field):
The filename becomes the URL, e.g., `my-new-post.md` → `/blog/my-new-post/`

## Deployment

### GitHub Pages with Custom Domain

1. Push to GitHub
2. Go to Settings → Pages
3. Set Source to "GitHub Actions"
4. The included workflow will build and deploy automatically
5. Your domain (www.jeffdouglas.com) is configured via the CNAME file

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for production |
| `npm run preview` | Preview build locally |
| `npm run migrate` | Run migration script |

## Customization

### Colors

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --brand-color: #0073ec;
  /* ... */
}
```

### Hero Section

Edit the `hero` object in `src/pages/index.astro`

### Footer Gallery

Edit the `gallery` array in `src/components/Footer.astro`

### Navigation

Edit links in `src/components/Header.astro`
