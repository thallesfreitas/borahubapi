export const searchBody = {
  type: 'object',
  additionalProperties: false,
  required: ['limit', 'skip'],
  properties: {
    filter: { type: 'string' },
    keyword: { type: 'string' },
    tag: { type: 'string' },
    category: { type: 'string' },
    area: { type: 'string' },
    limit: { type: 'number' },
    skip: { type: 'number' },
    isActive: { type: 'boolean' },
  },
};
