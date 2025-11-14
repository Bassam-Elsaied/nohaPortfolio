export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category/Badge',
      type: 'string',
      description: 'e.g., "Travel Company", "Marketing Agency", "E-commerce"',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'link',
      title: 'Project Link',
      type: 'url',
      description: 'Link to the project or content plan',
      validation: Rule => Rule.required()
    },
    {
      name: 'isFeatured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Check this to show in Featured Works section',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: Rule => Rule.required().min(0)
    }
  ],
  orderings: [
    {
      title: 'Order, Ascending',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'isFeatured', direction: 'desc'},
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
      isFeatured: 'isFeatured'
    },
    prepare(selection) {
      const {title, subtitle, media, isFeatured} = selection
      return {
        title: isFeatured ? `⭐ ${title}` : title,
        subtitle,
        media
      }
    }
  }
}

