import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name:  'post',
  title: 'Blog Post',
  type:  'document',
  icon: () => '✍️',
  fields: [
    defineField({
      name:  'title',
      title: 'Title',
      type:  'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name:    'slug',
      title:   'Slug',
      type:    'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name:  'excerpt',
      title: 'Excerpt',
      type:  'text',
      rows:  3,
      description: 'Short description shown on the blog listing page',
    }),
    defineField({
      name:  'mainImage',
      title: 'Cover Image',
      type:  'image',
      options: { hotspot: true },
    }),
    defineField({
      name:  'publishedAt',
      title: 'Published At',
      type:  'datetime',
    }),
    defineField({
      name:  'readTime',
      title: 'Read Time (minutes)',
      type:  'number',
    }),

    // ── Relations ──────────────────────────────────────────────────────────────
    defineField({
      name:  'category',
      title: 'Category',
      type:  'reference',
      to:    [{ type: 'category' }],
      description: 'e.g. Databases, Angular, Rails, Career',
    }),
    defineField({
      name:  'tags',
      title: 'Tags',
      type:  'array',
      of:    [{ type: 'reference', to: [{ type: 'tag' }] }],
      options: { layout: 'tags' },
    }),
    defineField({
      name:  'series',
      title: 'Series',
      type:  'reference',
      to:    [{ type: 'series' }],
    }),
    defineField({
      name:  'seriesPart',
      title: 'Part Number in Series',
      type:  'number',
    }),


    defineField({
      name:  'status',
      title: 'Status',
      type:  'string',
      options: {
        list: [
          { title: '✅ Published', value: 'published' },
          { title: '📝 Draft',     value: 'draft' },
          { title: '🗄️ Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'published',
      validation: Rule => Rule.required(),
    }),
    // ── Content ────────────────────────────────────────────────────────────────
    defineField({
      name:        'markdownContent',
      title:       'Content (Markdown)',
      type:        'text',
      rows:        40,
      description: 'Paste your full article in Markdown format. It will be rendered on the blog.',
    }),
    defineField({
      name:  'externalUrl',
      title: 'External URL',
      type:  'url',
      description: 'Medium or Dev.to link — used if no markdown content is provided',
    }),
  ],
  preview: {
    select: {
      title:    'title',
      category: 'category.name',
      series:   'series.name',
      part:     'seriesPart',
      media:    'mainImage',
    },
    prepare({title, category, series, part, media}) {
      const sub = series ? `${series}${part ? ' #' + part : ''}` : (category || '');
      return { title, subtitle: sub, media };
    },
  },
})
