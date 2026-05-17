import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

// 👉 Replace with your Sanity project details after running: sanity init
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'YOUR_PROJECT_ID';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

export default defineConfig({
  name: 'arshdeep-blogs-studio',
  title: 'Arsh.blog — Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Posts').child(S.documentTypeList('post').title('Posts')),
            S.listItem().title('Authors').child(S.documentTypeList('author').title('Authors')),
            S.listItem().title('Categories').child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
