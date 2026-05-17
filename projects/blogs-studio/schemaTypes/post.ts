import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({ name: 'publishedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'updatedAt', type: 'datetime' }),
    defineField({ name: 'excerpt', type: 'text', rows: 3, validation: (r) => r.required().max(300) }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({ name: 'readTime', type: 'number', description: 'Estimated reading time in minutes' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string' })],
        },
        {
          type: 'object',
          name: 'code',
          title: 'Code block',
          fields: [
            defineField({ name: 'language', type: 'string', options: { list: ['typescript', 'javascript', 'ruby', 'html', 'scss', 'css', 'bash', 'json', 'yaml', 'sql'] } }),
            defineField({ name: 'filename', type: 'string' }),
            defineField({ name: 'code', type: 'text', rows: 10 }),
          ],
          preview: { select: { title: 'filename', subtitle: 'language' } },
        },
      ],
    }),
    defineField({ name: 'seoTitle', type: 'string', description: 'Override page <title> for SEO' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, description: 'Override meta description' }),
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'coverImage', date: 'publishedAt' },
    prepare({ title, author, media, date }) {
      return {
        title,
        subtitle: `${author ?? 'Unknown'} · ${date ? new Date(date).toLocaleDateString() : 'Draft'}`,
        media,
      };
    },
  },
  orderings: [{ title: 'Published (newest first)', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
});
