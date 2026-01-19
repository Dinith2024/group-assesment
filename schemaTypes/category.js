export default {
  name: 'category',
  title: 'Menu Categories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required(), 
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}