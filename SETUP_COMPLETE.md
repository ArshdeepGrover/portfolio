# ✅ Sanity CMS Blog - Setup Complete!

## 🎉 What's Been Configured

### Angular App

- ✅ Sanity client installed (`@sanity/client`)
- ✅ Environment files configured with project ID: `xtbg0ogx`
- ✅ `SanityService` created with blog fetching methods
- ✅ `BlogListComponent` - displays all blog posts
- ✅ `BlogDetailComponent` - displays individual posts
- ✅ Routes configured: `/blog` and `/blog/:slug`

### Sanity CMS (personal-blogs folder)

- ✅ Sanity project created with ID: `xtbg0ogx`
- ✅ Blog schema created with all fields
- ✅ Schema registered in Sanity config

---

## 🚀 Next Steps

### 1. Start Sanity Studio

```bash
cd personal-blogs
npm run dev
```

This will open Sanity Studio at **http://localhost:3333**

### 2. Configure CORS (Important!)

1. Go to https://www.sanity.io/manage
2. Select your project: **Personal Blogs**
3. Go to **API** → **CORS Origins**
4. Add these origins:
   - `http://localhost:4200` (for Angular dev)
   - `http://localhost:3333` (for Sanity Studio)
   - Your production URL (when deployed)

### 3. Create Your First Blog Post

In Sanity Studio (http://localhost:3333):

1. Click **"Blog"** in the sidebar
2. Click **"+"** or **"Create new Blog"**
3. Fill in:
   - **Title**: Your blog post title
   - **Slug**: Click "Generate" button
   - **Banner Image**: Upload an image
   - **Excerpt**: Short description (max 200 chars)
   - **Body**: Write your blog content
   - **Published At**: Set the date/time
   - **Tags**: Add tags (optional)
4. Click **"Publish"**

### 4. Start Your Angular App

In a new terminal (from project root):

```bash
npm start
```

Visit **http://localhost:4200/blog** to see your posts!

---

## 📁 Project Structure

```
your-portfolio/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── blog-list/          # /blog route
│   │   │   └── blog-detail/        # /blog/:slug route
│   │   ├── services/
│   │   │   └── sanity.service.ts   # Sanity API calls
│   │   └── app.routes.ts
│   └── environments/
│       ├── environment.ts          # Project ID: xtbg0ogx
│       └── environment.prod.ts
│
└── personal-blogs/                 # Sanity CMS
    ├── schemaTypes/
    │   ├── blog.ts                 # Blog schema definition
    │   └── index.ts
    └── sanity.config.ts            # Sanity configuration
```

---

## 🎨 Available Features

### Blog List Page (`/blog`)

- Grid layout of all blog posts
- Banner images
- Excerpts
- Tags
- Published dates
- Responsive design

### Blog Detail Page (`/blog/:slug`)

- Full blog post content
- Banner image
- Rich text formatting (H2, H3, bold, italic, links)
- Tags
- Back to blog button

### Sanity Service Methods

```typescript
// Get all posts
sanityService.getPosts();

// Get single post by slug
sanityService.getPostBySlug("my-first-post");

// Get recent posts (limit)
sanityService.getRecentPosts(3);

// Get posts by tag
sanityService.getPostsByTag("angular");
```

---

## 🔧 Optional: Deploy Sanity Studio

To get a hosted URL for managing your blog from anywhere:

```bash
cd personal-blogs
npm run deploy
```

You'll get a URL like: `https://your-project.sanity.studio`

---

## 🎯 Quick Commands

```bash
# Start Sanity Studio
cd personal-blogs && npm run dev

# Start Angular app
npm start

# Deploy Sanity Studio
cd personal-blogs && npm run deploy

# Build Angular for production
npm run build
```

---

## 📝 Tips

1. **Images**: Upload high-quality banner images (recommended: 1200x630px)
2. **Excerpts**: Keep them short and engaging (max 200 characters)
3. **Slugs**: Always generate slugs from titles for SEO-friendly URLs
4. **Tags**: Use consistent tag names for better organization
5. **Published Date**: Set future dates to schedule posts

---

## 🐛 Troubleshooting

### "Failed to load blog posts"

- Check CORS settings in Sanity dashboard
- Verify project ID in environment files
- Make sure Sanity Studio is running

### Posts not showing

- Ensure posts are **published** (not drafts)
- Check that `publishedAt` date is set
- Verify the dataset is `production`

### Images not loading

- Check image URLs in Sanity Studio
- Verify CORS settings include your domain

---

**You're all set! Start creating amazing blog content! 🎉**
