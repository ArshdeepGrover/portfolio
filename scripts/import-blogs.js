/**
 * Import markdown blog files into Sanity
 * Usage: node scripts/import-blogs.js
 */
const {createClient} = require('@sanity/client');
const fs   = require('fs');
const path = require('path');

const client = createClient({
  projectId:  'ga7xrwxs',
  dataset:    'production',
  apiVersion: '2024-04-05',
  token:      process.env.SANITY_TOKEN,
  useCdn:     false,
});

const MD_DIR = '/Users/arshdeepsingh/Desktop/personal/PROJECTS/portfolio/scripts/blog-content';

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function slugFromFilename(filename) {
  return toSlug(filename.replace(/\.md$/, '').replace(/^blog[-_]/, ''));
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    const titleMatch   = content.match(/^#\s+(.+)$/m);
    const excerptMatch = content.match(/(?:^|\n)(?!#)[^\n]{50,}/m);
    return {
      data: { title: titleMatch ? titleMatch[1].replace(/[*_]/g, '').trim() : 'Untitled' },
      content,
      excerpt: excerptMatch ? excerptMatch[0].trim().slice(0, 220) : '',
    };
  }
  const data = {};
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx < 1) return;
    const key = line.slice(0, idx).trim();
    let val   = line.slice(idx + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''));
    } else {
      val = val.replace(/^['"]|['"]$/g, '');
    }
    data[key] = val;
  });
  return { data, content: match[2], excerpt: data.description || '' };
}

function estimateReadTime(content) {
  return Math.max(3, Math.round(content.split(/\s+/).length / 200));
}

// ── Seed data ──────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Databases',   icon: '🗄️',  color: '#3B82F6', desc: 'Deep dives into database internals, SQL, and data engineering' },
  { name: 'Angular',     icon: '⚡',   color: '#DD0031', desc: 'Angular framework, tooling, and best practices' },
  { name: 'Ruby on Rails', icon: '💎', color: '#CC0000', desc: 'Rails patterns, performance, and production tips' },
  { name: 'Career',      icon: '🚀',  color: '#FF7955', desc: 'Engineering career growth and personal experience' },
];

const SERIES_LIST = [
  { name: 'Database Engineering, Decoded', desc: 'From first principles — pages, indexes, ACID, WAL and beyond' },
  { name: 'Angular, Decoded',              desc: 'Every config file and concept explained clearly' },
  { name: 'Rails in Production',           desc: 'Real-world Rails patterns for scalable apps' },
];

// File → metadata mapping
const BLOG_META = [
  { file: 'blog_db1_what_is_a_database.md',      category: 'Databases',        series: 'Database Engineering, Decoded', part: 1 },
  { file: 'blog-db2-data-models.md',              category: 'Databases',        series: 'Database Engineering, Decoded', part: 2 },
  { file: 'blog-db3-cap-theorem.md',              category: 'Databases',        series: 'Database Engineering, Decoded', part: 3 },
  { file: 'blog-db4-indexes.md',                  category: 'Databases',        series: 'Database Engineering, Decoded', part: 4 },
  { file: 'blog-db5-acid.md',                     category: 'Databases',        series: 'Database Engineering, Decoded', part: 5 },
  { file: 'blog-db6-subqueries-joins-ctes.md',    category: 'Databases',        series: 'Database Engineering, Decoded', part: 6 },
  { file: 'blog-db7-explain-analyze.md',          category: 'Databases',        series: 'Database Engineering, Decoded', part: 7 },
  { file: 'blog-db8-database-design.md',          category: 'Databases',        series: 'Database Engineering, Decoded', part: 8 },
  { file: 'blog-db9-transactions-locking.md',     category: 'Databases',        series: 'Database Engineering, Decoded', part: 9 },
  { file: 'blog-db10-wal.md',                     category: 'Databases',        series: 'Database Engineering, Decoded', part: 10 },
  { file: 'blog-db11-connection-pooling.md',      category: 'Databases',        series: 'Database Engineering, Decoded', part: 11 },
  { file: 'blog-db12-security.md',                category: 'Databases',        series: 'Database Engineering, Decoded', part: 12 },
  { file: 'blog-db13-redis-caching.md',           category: 'Databases',        series: 'Database Engineering, Decoded', part: 13 },
  { file: 'blog-db14-timeseries.md',              category: 'Databases',        series: 'Database Engineering, Decoded', part: 14 },
  { file: 'blog-db15-interview-framework.md',     category: 'Databases',        series: 'Database Engineering, Decoded', part: 15 },
  { file: 'blog_angular_json.md',                 category: 'Angular',          series: 'Angular, Decoded' },
  { file: 'blog_angular_project_structure.md',    category: 'Angular',          series: 'Angular, Decoded' },
  { file: 'blog_dist.md',                         category: 'Angular',          series: 'Angular, Decoded' },
  { file: 'blog_environments.md',                 category: 'Angular',          series: 'Angular, Decoded' },
  { file: 'blog_package_json.md',                 category: 'Angular',          series: 'Angular, Decoded' },
  { file: 'blog_tsconfig_json.md',                category: 'Angular',          series: 'Angular, Decoded' },
  { file: 'blog_intern_to_lead.md',               category: 'Career' },
  { file: 'blog-r1-rails-n-plus-one.md',          category: 'Ruby on Rails',    series: 'Rails in Production', part: 1 },
  { file: 'blog-r2-hotwire-vs-api-first.md',      category: 'Ruby on Rails',    series: 'Rails in Production', part: 2 },
];

async function run() {
  if (!process.env.SANITY_TOKEN) {
    console.error('\n❌ Set SANITY_TOKEN first:');
    console.error('   export SANITY_TOKEN=your_token');
    console.error('   Get it: sanity.io/manage → project → API → Tokens → Add (Editor)\n');
    process.exit(1);
  }

  // ── Step 1: Create categories ──────────────────────────────────────────────
  console.log('\n📂 Creating categories…');
  const categoryIds = {};
  for (const cat of CATEGORIES) {
    const slug = toSlug(cat.name);
    const doc  = { _type: 'category', _id: 'category-' + slug, name: cat.name, slug: { _type: 'slug', current: slug }, description: cat.desc, icon: cat.icon, color: cat.color };
    await client.createOrReplace(doc);
    categoryIds[cat.name] = 'category-' + slug;
    console.log('  ✅ ' + cat.name);
  }

  // ── Step 2: Create series ──────────────────────────────────────────────────
  console.log('\n📚 Creating series…');
  const seriesIds = {};
  for (const s of SERIES_LIST) {
    const slug = toSlug(s.name);
    const doc  = { _type: 'series', _id: 'series-' + slug, name: s.name, slug: { _type: 'slug', current: slug }, description: s.desc };
    await client.createOrReplace(doc);
    seriesIds[s.name] = 'series-' + slug;
    console.log('  ✅ ' + s.name);
  }

  // ── Step 3: Collect and create all tags ───────────────────────────────────
  console.log('\n🏷️  Collecting tags…');
  const allTagNames = new Set();
  for (const meta of BLOG_META) {
    const filepath = path.join(MD_DIR, meta.file);
    if (!fs.existsSync(filepath)) continue;
    const { data } = parseFrontmatter(fs.readFileSync(filepath, 'utf8'));
    const tags = Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []);
    tags.forEach(t => allTagNames.add(t.toLowerCase().trim()));
  }
  // Add category-based default tags
  ['databases', 'sql', 'angular', 'typescript', 'ruby', 'rails', 'backend', 'frontend', 'career', 'performance'].forEach(t => allTagNames.add(t));

  const tagIds = {};
  for (const tagName of allTagNames) {
    if (!tagName) continue;
    const slug = toSlug(tagName);
    const doc  = { _type: 'tag', _id: 'tag-' + slug, name: tagName, slug: { _type: 'slug', current: slug } };
    await client.createOrReplace(doc);
    tagIds[tagName] = 'tag-' + slug;
  }
  console.log('  ✅ ' + allTagNames.size + ' tags created');

  // ── Step 4: Import posts ───────────────────────────────────────────────────
  console.log('\n✍️  Importing blog posts…');
  let imported = 0, skipped = 0;

  for (const meta of BLOG_META) {
    const filepath = path.join(MD_DIR, meta.file);
    if (!fs.existsSync(filepath)) {
      console.warn('  ⚠️  Not found: ' + meta.file);
      skipped++;
      continue;
    }

    const raw    = fs.readFileSync(filepath, 'utf8');
    const parsed = parseFrontmatter(raw);
    const { data, content, excerpt } = parsed;
    const slug   = data.slug || slugFromFilename(meta.file);

    // Tags — from frontmatter or category-based defaults
    const rawTags = Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []);
    const tagRefs = rawTags
      .map(t => t.toLowerCase().trim())
      .filter(t => tagIds[t])
      .map(t => ({ _type: 'reference', _ref: tagIds[t], _key: tagIds[t] }));

    const doc = {
      _type: 'post',
      _id:   'blog-' + slug,
      title: data.title || 'Untitled',
      slug:  { _type: 'slug', current: slug },
      excerpt: data.description || excerpt || '',
      publishedAt: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      readTime:    data.readTime ? parseInt(data.readTime) : estimateReadTime(content),
      tags:        tagRefs,
      category:    categoryIds[meta.category] ? { _type: 'reference', _ref: categoryIds[meta.category] } : undefined,
      series:      meta.series && seriesIds[meta.series] ? { _type: 'reference', _ref: seriesIds[meta.series] } : undefined,
      seriesPart:  meta.part || undefined,
      markdownContent: content,
      externalUrl: data.canonical || data.url || undefined,
    };

    Object.keys(doc).forEach(k => doc[k] === undefined && delete doc[k]);

    try {
      await client.createOrReplace(doc);
      console.log('  ✅ ' + meta.file + ' → /' + slug);
      imported++;
    } catch (err) {
      console.error('  ❌ ' + meta.file + ': ' + err.message);
    }
  }

  console.log('\n🎉 Done!');
  console.log('   Categories: ' + CATEGORIES.length);
  console.log('   Series:     ' + SERIES_LIST.length);
  console.log('   Tags:       ' + allTagNames.size);
  console.log('   Posts:      ' + imported + ' imported, ' + skipped + ' skipped');
}

run();
