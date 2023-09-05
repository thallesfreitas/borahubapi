export const getPacks = {
  type: 'object',
  additionalProperties: false,
  required: ['type'],
  properties: {},
};

export const getPack = {
  type: 'object',
  additionalProperties: false,
  required: ['type'],
  properties: {
    type: { type: 'string' },
  },
};

export const createPack = {
  type: 'object',
  additionalProperties: false,
  required: ['type'],
  properties: {
    type: { type: 'string' },
    name: { type: 'string' },
    unit_amount: { type: 'number' },
    amount: { type: 'number' },
    features: { type: 'array' },
    phrases: { type: 'string' },
    credits: { type: 'number' },
  },
};
