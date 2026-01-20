export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Item Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price (LKR)',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, 
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference', 
      to: [{ type: 'category' }], 
      validation: Rule => Rule.required() 
    },
  ],
}