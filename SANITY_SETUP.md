# 🚀 Sanity CMS Setup Guide for Angular Portfolio

## ✅ Completed Steps

The following has been set up in your Angular project:

1. ✅ Installed `@sanity/client` package
2. ✅ Created environment configuration files
3. ✅ Created `SanityService` with methods for fetching blog posts
4. ✅ Created `BlogListComponent` for displaying all posts
5. ✅ Created `BlogDetailComponent` for individual post view
6. ✅ Added blog routes to `app.routes.ts`

---

## 📋 Next Steps (Manual Setup Required)

### 1️⃣ Create Sanity Project

Run this command in your project root:

```bash
npm create sanity@latest
```

**When prompted, use these settings:**

- Project name: `arshdeep-blog`
- Output path: `sanity`
- Template: `Clean project with schema`
- Dataset: `production`
- Enable Sanity Studio: `yes`

### 2️⃣ Navigate to Sanity Folder

```bash
cd sanity
```

### 3️⃣ Create Blog Schema

Create a new file: `sanity/schemas/blog.js`

```javascript
export default {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "banner",
      title: "Banner Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "banner",
      subtitle: "publishedAt",
    },
  },
};
```

### 4️⃣ Update Sanity Config

Edit `sanity/sanity.config.js` (or `.ts`) to import your schema:

```javascript
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import blog from "./schemas/blog";

export default defineConfig({
  name: "default",
  title: "Arshdeep Blog",

  projectId: "YOUR_PROJECT_ID", // You'll get this after setup
  dataset: "production",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [blog],
  },
});
```

### 5️⃣ Start Sanity Studio Locally

```bash
npm run dev
```

This will open Sanity Studio at `http://localhost:3333`

### 6️⃣ Deploy Sanity Studio

```bash
npm run deploy
```

This gives you a hosted URL where you can manage your blog from anywhere.

### 7️⃣ Update Angular Environment Files

After creating your Sanity project, you'll get a **Project ID**. Update these files:

**`src/environments/environment.ts`**
**`src/environments/environment.prod.ts`**

Replace `'YOUR_PROJECT_ID'` with your actual Sanity project ID.

### 8️⃣ Configure CORS in Sanity

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to **API** settings
4. Add your Angular app's URL to **CORS Origins**:
   - `http://localhost:4200` (for development)
   - Your production URL (when deployed)

---

## 🎨 Using the Blog in Your Portfolio

### Add Blog Link to Navigation

Update your navigation component to include:

```html
<a routerLink="/blog">Blog</a>
```

### Test the Blog

1. Start your Angular app: `npm start`
2. Navigate to `http://localhost:4200/blog`
3. Create some blog posts in Sanity Studio
4. They'll appear automatically in your Angular app!

---

## 📝 Creating Your First Blog Post

1. Open Sanity Studio (locally or deployed URL)
2. Click **"Blog"** in the sidebar
3. Click **"Create new Blog"**
4. Fill in:
   - Title
   - Click "Generate" next to Slug
   - Upload a banner image
   - Write an excerpt
   - Write your blog content
   - Add tags
   - Set published date
5. Click **"Publish"**

Your post will immediately appear in your Angular app!

---

## 🔧 Available Service Methods

The `SanityService` provides these methods:

```typescript
// Get all posts
sanityService.getPosts();

// Get single post by slug
sanityService.getPostBySlug("my-post-slug");

// Get recent posts (limit)
sanityService.getRecentPosts(3);

// Get posts by tag
sanityService.getPostsByTag("angular");
```

---

## 🚀 Next Enhancements

- Add search functionality
- Add pagination
- Add related posts
- Add comments (using Sanity comments or third-party)
- Add social sharing buttons
- Add reading time estimation
- Add table of contents for long posts

---

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Client for JavaScript](https://www.sanity.io/docs/js-client)
- [Portable Text](https://www.sanity.io/docs/presenting-block-text)

---

**Happy Blogging! 🎉**
