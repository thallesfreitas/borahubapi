export const sendMessage = {
  type: 'object',
  additionalProperties: false,
  // required: ['to', 'message'],
  required: ['message'],
  properties: {
    // to: {
    //   type: 'string',
    // },
    message: {
      type: 'string',
    },
  },
};
