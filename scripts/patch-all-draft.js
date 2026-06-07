const {createClient} = require('@sanity/client');

const client = createClient({
  projectId:  'ga7xrwxs',
  dataset:    'production',
  apiVersion: '2024-04-05',
  token:      process.env.SANITY_TOKEN,
  useCdn:     false,
});

const targetStatus = process.argv.includes('--publish') ? 'published' : 'draft';

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Set SANITY_TOKEN first');
    process.exit(1);
  }

  const posts = await client.fetch('*[_type == "post"]{ _id, title }');
  const action = targetStatus === 'draft' ? 'Drafting' : 'Publishing';
  console.log('\n' + action + ' all ' + posts.length + ' posts...\n');

  let ok = 0;
  for (const post of posts) {
    try {
      await client.patch(post._id).set({ status: targetStatus }).commit();
      console.log('  OK  ' + post.title);
      ok++;
    } catch (err) {
      console.error('  ERR  ' + post._id + ': ' + err.message);
    }
  }

  console.log('\n' + ok + '/' + posts.length + ' posts set to ' + targetStatus + '\n');
}

main().catch(err => { console.error(err.message); process.exit(1); });
