export default {
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Delivery Address',
      type: 'text',
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Cash on Delivery', value: 'cod' },
          { title: 'Card Payment', value: 'card' }
        ]
      }
    },
    {
      name: 'items',
      title: 'Ordered Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string' },
            { name: 'qty', type: 'number' },
            { name: 'price', type: 'number' }
          ]
        }
      ]
    },
    {
      name: 'total',
      title: 'Total Amount',
      type: 'number',
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' }
        ],
      },
      initialValue: 'pending'
    }
  ]
}