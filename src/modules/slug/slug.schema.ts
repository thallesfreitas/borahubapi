export const getBySlugApplicationParams = {
  type: 'object',
  additionalProperties: false,
  required: ['slug'],
  properties: {
    slug: {
      type: 'string',
    },
    limit: {
      type: 'number',
    },
    skip: {
      type: 'number',
    },
  },
};

export const getBySlugParams = {
  type: 'object',
  additionalProperties: false,
  required: ['slug'],
  properties: {
    slug: {
      type: 'string',
    },
    userID: {
      type: 'number',
    },
  },
};

export const verifySlugParams = {
  type: 'object',
  additionalProperties: false,
  required: ['slug'],
  properties: {
    slug: {
      type: 'string',
    },
  },
};
