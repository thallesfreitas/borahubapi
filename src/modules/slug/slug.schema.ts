export const getBySlugParams = {
  type: 'object',
  additionalProperties: false,
  required: ['slug'],
  properties: {
    slug: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
  },
};
