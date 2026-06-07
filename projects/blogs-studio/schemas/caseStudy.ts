import {defineField, defineType} from 'sanity'

export const caseStudyType = defineType({
  name:  'caseStudy',
  title: 'Case Study',
  type:  'document',
  icon:  () => '💼',
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    defineField({
      name:  'title',
      title: 'Project Title',
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
      name:  'status',
      title: 'Status',
      type:  'string',
      options: {
        list: [
          { title: '✅ Published', value: 'published' },
          { title: '📝 Draft',     value: 'draft' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name:  'featured',
      title: 'Featured on homepage?',
      type:  'boolean',
      initialValue: false,
    }),

    // ── Client ────────────────────────────────────────────────────────────────
    defineField({
      name:  'clientName',
      title: 'Client Name',
      type:  'string',
    }),
    defineField({
      name:  'clientRole',
      title: 'Client Role / Title',
      type:  'string',
      description: 'e.g. Founder, CEO, Product Manager',
    }),
    defineField({
      name:  'clientCompany',
      title: 'Client Company',
      type:  'string',
    }),
    defineField({
      name:  'industry',
      title: 'Industry',
      type:  'string',
      description: 'e.g. Beauty & Wellness, E-commerce, SaaS, EdTech',
    }),
    defineField({
      name:  'duration',
      title: 'Project Duration',
      type:  'string',
      description: 'e.g. 2 weeks, 1 month',
    }),
    defineField({
      name:  'liveUrl',
      title: 'Live URL',
      type:  'url',
    }),

    // ── Services & Tech ───────────────────────────────────────────────────────
    defineField({
      name:  'services',
      title: 'Services Provided',
      type:  'array',
      of:    [{ type: 'string' }],
      options: {
        list: [
          'Web Design', 'Frontend Development', 'Full-Stack App',
          'UI/UX Consulting', 'SEO Audit', 'Performance Optimisation',
          'Branding', 'CMS Setup', 'API Integration',
        ],
        layout: 'tags',
      },
    }),
    defineField({
      name:  'techStack',
      title: 'Tech Stack',
      type:  'array',
      of:    [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. Angular, Ruby on Rails, PostgreSQL, Sanity, Tailwind',
    }),

    // ── Media ─────────────────────────────────────────────────────────────────
    defineField({
      name:  'coverImage',
      title: 'Cover Image',
      type:  'image',
      options: { hotspot: true },
    }),
    defineField({
      name:  'gallery',
      title: 'Gallery',
      type:  'array',
      of:    [{ type: 'image', options: { hotspot: true } }],
      description: 'Before/after screenshots or project visuals',
    }),

    // ── Content ───────────────────────────────────────────────────────────────
    defineField({
      name:  'summary',
      title: 'Summary',
      type:  'text',
      rows:  3,
      description: 'One paragraph overview shown on the listing card',
    }),
    defineField({
      name:  'challenge',
      title: 'The Challenge',
      type:  'text',
      rows:  6,
      description: 'What problem did the client have?',
    }),
    defineField({
      name:  'solution',
      title: 'The Solution',
      type:  'text',
      rows:  8,
      description: 'What was built and how?',
    }),

    // ── Results / Metrics ─────────────────────────────────────────────────────
    defineField({
      name:  'results',
      title: 'Results & Metrics',
      type:  'array',
      of: [{
        type:   'object',
        name:   'metric',
        fields: [
          { name: 'label', title: 'Label',       type: 'string', description: 'e.g. Load time improved by' },
          { name: 'value', title: 'Value',        type: 'string', description: 'e.g. 40%' },
          { name: 'icon',  title: 'Icon (emoji)', type: 'string', description: 'e.g. ⚡' },
        ],
        preview: {
          select: { title: 'label', subtitle: 'value', icon: 'icon' },
          prepare: ({title, subtitle, icon}: any) => ({ title: (icon || '') + ' ' + subtitle, subtitle: title }),
        },
      }],
    }),

    // ── Testimonial ───────────────────────────────────────────────────────────
    defineField({
      name:  'testimonialQuote',
      title: 'Client Testimonial Quote',
      type:  'text',
      rows:  3,
    }),
    defineField({
      name:  'testimonialAuthor',
      title: 'Testimonial Author',
      type:  'string',
    }),

    defineField({
      name:  'publishedAt',
      title: 'Published At',
      type:  'datetime',
    }),
  ],
  preview: {
    select: { title: 'title', client: 'clientCompany', media: 'coverImage', status: 'status' },
    prepare: ({title, client, media, status}: any) => ({
      title,
      subtitle: (client || '') + (status === 'draft' ? '  📝 draft' : '  ✅ live'),
      media,
    }),
  },
})
