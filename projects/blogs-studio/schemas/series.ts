import {defineField, defineType} from 'sanity'

export const seriesType = defineType({
  name:  'series',
  title: 'Series',
  type:  'document',
  icon: () => '📚',
  fields: [
    defineField({
      name:  'name',
      title: 'Series Name',
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
      name:  'coverImage',
      title: 'Cover Image',
      type:  'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'description', media: 'coverImage' },
    prepare: ({title, subtitle, media}) => ({ title: '📚 ' + title, subtitle, media }),
  },
})
