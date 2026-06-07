import {defineField, defineType} from 'sanity'

export const tagType = defineType({
  name:  'tag',
  title: 'Tag',
  type:  'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name:  'name',
      title: 'Tag Name',
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
  ],
  preview: {
    select: { title: 'name' },
    prepare: ({title}) => ({ title, subtitle: '#tag' }),
  },
})
