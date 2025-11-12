# 📝 How to Add Your Medium Article

## What Changed

I've added support for **external blog posts** (like Medium articles) to your blog system!

### New Features:

- ✅ `externalUrl` field in Sanity schema
- ✅ External posts open in new tab
- ✅ "External" badge on external posts
- ✅ Internal posts still work normally

---

## How to Add Your Medium Article

### 1. Start Sanity Studio

```bash
cd personal-blogs
npm run dev
```

Opens at: **http://localhost:3333**

### 2. Create New Blog Post

Click **"Blog"** → **"Create"**

### 3. Fill in the Details

**Title:**

```
Building a Communication Network Between Two Components in Angular
```

**Slug:**
Click "Generate" button (it will create: `building-a-communication-network-between-two-components-in-angular`)

**Banner Image:**

- Upload a relevant image (Angular logo, communication diagram, etc.)
- Or skip if you don't have one

**Excerpt:** (Max 200 characters)

```
Learn how to establish effective communication between Angular components using various techniques including Input/Output, Services, and RxJS.
```

**Body:**

- **Leave this EMPTY** for external posts (since the content is on Medium)

**Published At:**

- Set the original publication date from Medium

**Tags:**

- `Angular`
- `TypeScript`
- `Web Development`
- `Component Communication`

**External URL:** ⭐ **THIS IS THE KEY FIELD**

```
https://medium.com/@ArshdeepGrover/building-a-communication-network-between-two-components-in-angular-d25daeb6ef07
```

### 4. Publish

Click **"Publish"** button

---

## What Happens

When users visit your blog page (`/blog`):

- They'll see your Medium article in the list
- It will have an **"External"** badge
- Clicking it opens the Medium article in a new tab
- Your internal blog posts work normally

---

## Example Blog Post Entry

```
Title: Building a Communication Network Between Two Components in Angular
Slug: building-a-communication-network-between-two-components-in-angular
Excerpt: Learn how to establish effective communication between Angular components using various techniques.
Tags: Angular, TypeScript, Web Development
External URL: https://medium.com/@ArshdeepGrover/building-a-communication-network-between-two-components-in-angular-d25daeb6ef07
Body: (leave empty)
```

---

## Adding More Posts

You can mix and match:

- **External posts** (Medium, Dev.to, etc.) - Add `externalUrl`, leave body empty
- **Internal posts** - Leave `externalUrl` empty, write content in body

---

## Visual Difference

**External Post:**

```
┌─────────────────────────┐
│  [Image]                │
│                         │
│  Jan 15, 2024 [External]│
│  Building a Comm...     │
│  Learn how to...        │
│  #Angular #TypeScript   │
└─────────────────────────┘
```

**Internal Post:**

```
┌─────────────────────────┐
│  [Image]                │
│                         │
│  Jan 15, 2024           │
│  My First Post          │
│  This is my...          │
│  #Angular #Blog         │
└─────────────────────────┘
```

---

**Ready to add your Medium article! 🚀**
