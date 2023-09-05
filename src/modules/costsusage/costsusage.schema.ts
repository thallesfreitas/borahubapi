export const getUsage = {
  type: 'object',
  additionalProperties: false,
  required: ['type'],
  properties: {
    type: { type: 'string' },
  },
};

export const addUsage = {
  type: 'object',
  additionalProperties: false,
  required: ['type'],
  properties: {
    type: { type: 'string' },
    amount: { type: 'number' },
  },
};
