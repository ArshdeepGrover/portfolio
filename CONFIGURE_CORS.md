# 🔒 Configure CORS in Sanity (REQUIRED!)

## Why You Need This

The **403 Forbidden** error happens because Sanity blocks requests from unauthorized domains for security. You need to whitelist your Angular app's domain.

---

## Step-by-Step CORS Configuration

### 1. Go to Sanity Management

Open: **https://www.sanity.io/manage**

### 2. Select Your Project

Click on **"Personal Blogs"** (or your project name)

### 3. Navigate to API Settings

In the left sidebar, click:

- **API** → **CORS Origins**

### 4. Add CORS Origins

Click **"Add CORS origin"** button and add these URLs:

#### For Development:

```
http://localhost:4200
```

- Check: ✅ **Allow credentials**

#### For Sanity Studio:

```
http://localhost:3333
```

- Check: ✅ **Allow credentials**

#### For Production (when you deploy):

```
https://yourdomain.com
```

- Check: ✅ **Allow credentials**

### 5. Save

Click **"Save"** button

---

## What Each URL Does

| URL                      | Purpose                        |
| ------------------------ | ------------------------------ |
| `http://localhost:4200`  | Your Angular app (development) |
| `http://localhost:3333`  | Sanity Studio (local)          |
| `https://yourdomain.com` | Your deployed website          |

---

## After Configuring CORS

1. **Refresh your Angular app** (http://localhost:4200)
2. **Navigate to /blog**
3. Your blog posts should now load! ✅

---

## Still Getting 403 Error?

### Check:

1. ✅ CORS origins are saved in Sanity
2. ✅ URLs match exactly (no trailing slashes)
3. ✅ "Allow credentials" is checked
4. ✅ Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

### Test API Connection:

Open browser console and run:

```javascript
fetch('https://xtbg0ogx.api.sanity.io/v2025-01-01/data/query/production?query=*[_type=="blog"]')
  .then((r) => r.json())
  .then(console.log);
```

If you see data, CORS is working!

---

## Quick Visual Guide

```
┌─────────────────────────────────────┐
│  Sanity Management Dashboard        │
├─────────────────────────────────────┤
│  1. Select "Personal Blogs"         │
│  2. Click "API" in sidebar          │
│  3. Click "CORS Origins"            │
│  4. Click "Add CORS origin"         │
│  5. Enter: http://localhost:4200    │
│  6. Check "Allow credentials"       │
│  7. Click "Save"                    │
└─────────────────────────────────────┘
```

---

**This is a one-time setup. Once configured, your blog will work! 🚀**
