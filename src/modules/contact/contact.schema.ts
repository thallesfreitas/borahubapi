export const SendMessage = {
  type: 'object',
  additionalProperties: false,
  required: ['name', 'email', 'companyName', 'comments', 'phone'],
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    companyName: {
      type: 'string',
    },
    comments: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
  },
};
