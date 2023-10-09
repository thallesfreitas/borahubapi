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

export const sendMessageToGroups = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    message: { type: 'string' },
    type: { type: 'string' },
    userId: { type: 'number' },
    idMessage: { type: 'number' },
    typeCost: { type: 'string' },
  },
};
