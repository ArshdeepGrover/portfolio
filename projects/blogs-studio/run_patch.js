process.env.SANITY_TOKEN = 'skgnGuiKBa1ZQKvlUxO6WlcMfpkVqXeu3hjaUbWXPg12CExV6XG0EzKMfCUgYDZYwYQg7yoRgrd0jrjOLalKzFaovLiCq2fn6INcPWZRjo3duPAZhyUZt5DxlL8moQWW7jPyqGzvXkhL2XdUBbiux2XGJBwgb4kLDuITY4QIFUyq8XCxZ0ud';/**
 * Patch / seed Sanity reference data — Categories, Series, Tags
 * Run independently of blog import.
 *
 * Usage:
 *   export SANITY_TOKEN=your_token
 *   node scripts/patch-sanity-data.js
 *
 *   # Patch only one type:
 *   node scripts/patch-sanity-data.js --only=categories
 *   node scripts/patch-sanity-data.js --only=series
 *   node scripts/patch-sanity-data.js --only=tags
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId:  'ga7xrwxs',
  dataset:    'production',
  apiVersion: '2024-04-05',
  token:      process.env.SANITY_TOKEN,
  useCdn:     false,
});

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ── CATEGORIES ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Databases',      icon: '🗄️', color: '#3B82F6', description: 'Deep dives into database internals, SQL, indexes, ACID, and data engineering.' },
  { name: 'Angular',        icon: '⚡',  color: '#DD0031', description: 'Angular framework, tooling, configuration, and best practices.' },
  { name: 'Ruby on Rails',  icon: '💎', color: '#CC0000', description: 'Rails patterns, ActiveRecord, performance, and production tips.' },
  { name: 'Career',         icon: '🚀', color: '#FF7955', description: 'Engineering career growth, leadership, and personal experience.' },
  // Add more:
  // { name: 'DevOps', icon: '⚙️', color: '#F59E0B', description: '...' },
];

// ── SERIES ────────────────────────────────────────────────────────────────────
const SERIES = [
  { name: 'Database Engineering, Decoded', description: 'From first principles — pages, indexes, ACID, WAL, connection pooling and beyond. 15-part series.' },
  { name: 'Angular, Decoded',              description: 'Every Angular config file and concept explained clearly — angular.json, tsconfig, environments, and more.' },
  { name: 'Rails in Production',           description: 'Real-world Rails patterns for scalable, maintainable apps — N+1s, Hotwire, API design and beyond.' },
  // Add more:
  // { name: 'TypeScript Deep Dive', description: '...' },
];

// ── TAGS ──────────────────────────────────────────────────────────────────────
const TAGS = [
  // Databases
  'databases', 'sql', 'postgresql', 'mysql', 'indexing', 'acid',
  'cap-theorem', 'transactions', 'wal', 'connection-pooling',
  'redis', 'caching', 'timeseries', 'database-design',
  'explain-analyze', 'query-optimization', 'data-models', 'security',

  // Angular
  'angular', 'typescript', 'angular-json', 'tsconfig', 'rxjs',
  'standalone-components', 'angular-cli', 'environments', 'build',
  'lazy-loading', 'signals',

  // Rails
  'rails', 'ruby', 'activerecord', 'n-plus-one', 'eager-loading',
  'hotwire', 'turbo', 'api', 'backend', 'performance',

  // General
  'frontend', 'fullstack', 'web-development', 'javascript',
  'css', 'html', 'rest-api', 'graphql',

  // Career
  'career', 'leadership', 'mentorship', 'open-source',
  'hackathon', 'intern-to-lead', 'engineering',

  // Add more below
];

// ── PATCH FUNCTIONS ───────────────────────────────────────────────────────────
async function patchCategories() {
  console.log('\n📂  Patching categories...');
  let count = 0;
  for (const cat of CATEGORIES) {
    const slug = toSlug(cat.name);
    try {
      await client.createOrReplace({
        _type: 'category', _id: 'category-' + slug,
        name: cat.name, slug: { _type: 'slug', current: slug },
        description: cat.description, icon: cat.icon, color: cat.color,
      });
      console.log('   OK  ' + cat.icon + '  ' + cat.name);
      count++;
    } catch (err) { console.error('   ERR ' + cat.name + ': ' + err.message); }
  }
  console.log('   -> ' + count + ' / ' + CATEGORIES.length + ' categories patched');
}

async function patchSeries() {
  console.log('\n📚  Patching series...');
  let count = 0;
  for (const s of SERIES) {
    const slug = toSlug(s.name);
    try {
      await client.createOrReplace({
        _type: 'series', _id: 'series-' + slug,
        name: s.name, slug: { _type: 'slug', current: slug },
        description: s.description,
      });
      console.log('   OK  ' + s.name);
      count++;
    } catch (err) { console.error('   ERR ' + s.name + ': ' + err.message); }
  }
  console.log('   -> ' + count + ' / ' + SERIES.length + ' series patched');
}

async function patchTags() {
  console.log('\n🏷️   Patching tags...');
  const unique = [...new Set(TAGS.map(t => t.toLowerCase().trim()).filter(Boolean))].sort();
  let count = 0;
  for (const tag of unique) {
    const slug = toSlug(tag);
    try {
      await client.createOrReplace({
        _type: 'tag', _id: 'tag-' + slug,
        name: tag, slug: { _type: 'slug', current: slug },
      });
      count++;
    } catch (err) { console.error('   ERR ' + tag + ': ' + err.message); }
  }
  console.log('   OK  ' + count + ' / ' + unique.length + ' tags patched');
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('\nERROR: SANITY_TOKEN is not set.');
    console.error('  Get it: sanity.io/manage -> project ga7xrwxs -> API -> Tokens -> Add (Editor)');
    console.error('  Then:   export SANITY_TOKEN=your_token\n');
    process.exit(1);
  }

  const only = (process.argv.find(a => a.startsWith('--only=')) || '').replace('--only=', '');
  console.log('Sanity patch script — project: ga7xrwxs / production');

  if (!only || only === 'categories') await patchCategories();
  if (!only || only === 'series')     await patchSeries();
  if (!only || only === 'tags')       await patchTags();

  console.log('\nDone!\n');
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });
