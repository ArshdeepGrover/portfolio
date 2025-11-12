# 🚀 Quick Start - Sanity CMS Blog

## Setup Sanity (One-time)

```bash
# 1. Create Sanity project
npm create sanity@latest

# 2. Navigate to sanity folder
cd sanity

# 3. Start Sanity Studio locally
npm run dev
# Opens at http://localhost:3333

# 4. Deploy Sanity Studio (optional - for remote access)
npm run deploy
```

## Update Angular Config

After creating Sanity project, update your Project ID in:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Replace `'YOUR_PROJECT_ID'` with your actual Sanity project ID (found in `sanity/sanity.config.js`)

## Run Your Portfolio

```bash
# Start Angular dev server
npm start
# Opens at http://localhost:4200

# Visit your blog
# http://localhost:4200/blog
```

## Create Blog Posts

1. Open Sanity Studio (http://localhost:3333 or your deployed URL)
2. Click "Blog" → "Create new Blog"
3. Fill in the details and publish
4. Posts appear instantly in your Angular app!

## File Structure

```
your-portfolio/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── blog-list/          # Blog listing page
│   │   │   └── blog-detail/        # Individual blog post
│   │   ├── services/
│   │   │   └── sanity.service.ts   # Sanity API integration
│   │   └── app.routes.ts           # Routes with /blog paths
│   └── environments/
│       ├── environment.ts          # Dev config
│       └── environment.prod.ts     # Prod config
└── sanity/                         # Sanity CMS (created separately)
    ├── schemas/
    │   └── blog.js                 # Blog content schema
    └── sanity.config.js            # Sanity configuration
```

## Routes

- `/blog` - List all blog posts
- `/blog/:slug` - Individual blog post detail

---

For detailed setup instructions, see **SANITY_SETUP.md**
