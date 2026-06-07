import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name:  'category',
  title: 'Category',
  type:  'document',
  icon: () => '📂',
  fields: [
    defineField({
      name:  'name',
      title: 'Category Name',
      type:  'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name:    'slug',
      title:   'Slug',
      type:    'slug',
      options: { source: 'name', maxLength: 64 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name:  'description',
      title: 'Description',
      type:  'text',
      rows:  2,
    }),
    defineField({
      name:  'icon',
      title: 'Icon (emoji)',
      type:  'string',
      description: 'e.g. 🗄️ for databases, ⚡ for Angular',
    }),
    defineField({
      name:  'color',
      title: 'Accent Colour (hex)',
      type:  'string',
      description: 'e.g. #FF7955 — used for category badge on the blog',
      validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex colour' }).warning(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'description', icon: 'icon' },
    prepare: ({title, subtitle, icon}) => ({ title: (icon || '') + ' ' + title, subtitle }),
  },
})
