# Arsh.blog — Sanity Studio

This is the Sanity Studio for `blogs.arshdeepgrover.dev`.

## Quick Setup (5 minutes)

### 1. Create a Sanity project
```bash
cd projects/blogs-studio
npm install
npx sanity init --project-id YOUR_NEW_PROJECT_ID --dataset production
```
Or create one at [sanity.io/manage](https://sanity.io/manage).

### 2. Update project ID in two places
- `projects/blogs-studio/sanity.config.ts` → replace `YOUR_PROJECT_ID`
- `projects/blogs/src/environments/environment.ts` → replace `YOUR_PROJECT_ID`
- `projects/blogs/src/environments/environment.prod.ts` → add to Vercel env var `SANITY_PROJECT_ID`

### 3. Add CORS origin
In Sanity dashboard → API → CORS Origins → add `https://blogs.arshdeepgrover.dev`

### 4. Run locally
```bash
cd projects/blogs-studio
npm run dev
# Studio opens at http://localhost:3333
```

### 5. Deploy Studio to sanity.studio (free hosting)
```bash
npm run deploy
# Studio available at https://arshdeep-blogs-studio.sanity.studio
```

### 6. Deploy Studio to Vercel (optional — for custom domain)
Add a separate Vercel project pointing to `projects/blogs-studio` as the root directory.

## Schemas
| Type | Purpose |
|---|---|
| `post` | Blog posts with portable text body, cover image, categories, SEO fields |
| `author` | Author profile (name, bio, image) |
| `category` | Tags with custom hex color for badge styling |

## GROQ Cheatsheet
```groq
// All posts
*[_type == "post"] | order(publishedAt desc)

// Single post by slug
*[_type == "post" && slug.current == "my-post"][0]

// Posts by category
*[_type == "post" && "angular" in categories[]->slug.current]
```
