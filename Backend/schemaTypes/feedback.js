export default {
  name: 'feedback',
  title: 'Messages / Feedback',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Sent At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true 
    }
  ]
}