/**
 * Patch Angular blog series posts to draft status
 * Usage:
 *   export SANITY_TOKEN=your_token
 *   node scripts/patch-angular-draft.js
 *
 * To publish them back:
 *   node scripts/patch-angular-draft.js --publish
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId:  'ga7xrwxs',
  dataset:    'production',
  apiVersion: '2024-04-05',
  token:      process.env.SANITY_TOKEN,
  useCdn:     false,
});

// All Angular, Decoded series post IDs (from import script slugs)
const ANGULAR_POST_IDS = [
  'blog-angular-json',
  'blog-angular-project-structure',
  'blog-dist',
  'blog-environments',
  'blog-package-json',
  'blog-tsconfig-json',
];

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: Set SANITY_TOKEN first.');
    process.exit(1);
  }

  const targetStatus = process.argv.includes('--publish') ? 'published' : 'draft';
  const action = targetStatus === 'draft' ? 'Drafting' : 'Publishing';

  console.log('\n' + action + ' Angular blog series (' + ANGULAR_POST_IDS.length + ' posts)...\n');

  let ok = 0, notFound = 0;

  for (const id of ANGULAR_POST_IDS) {
    try {
      // Check if document exists first
      const exists = await client.getDocument(id);
      if (!exists) {
        console.log('  NOT FOUND  ' + id + ' (run import script first)');
        notFound++;
        continue;
      }

      await client.patch(id).set({ status: targetStatus }).commit();
      console.log('  OK  ' + id + '  ->  ' + targetStatus);
      ok++;
    } catch (err) {
      console.error('  ERR  ' + id + ': ' + err.message);
    }
  }

  console.log('\n' + ok + ' posts set to ' + targetStatus);
  if (notFound > 0) {
    console.log(notFound + ' not found — run: node scripts/import-blogs.js first');
  }
  console.log('');
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });
