export const getServiceProviderByIdParams = {
  type: 'object',
  additionalProperties: false,
  required: ['createdBy'],
  properties: {
    createdBy: {
      type: 'number',
    },
  },
};

export const getServiceProvidersQuerystring = {
  type: 'object',
  additionalProperties: false,
  required: ['limit', 'skip'],
  properties: {
    limit: {
      type: 'number',
    },
    skip: {
      type: 'number',
    },
  },
};

export const getServiceProvidersByUserQuerystring = {
  type: 'object',
  additionalProperties: false,
  required: ['userId'],
  properties: {
    userId: { type: 'number' },
  },
};

export const serviceProviderBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    userId: { type: 'number' },
    description: { type: 'string' },
    link: { type: 'string' },
    salary: { type: 'string' },
    areas: { type: 'string' },
    contractMode: { type: 'string' },
    actualRole: { type: 'string' },
    categories: { type: 'string' },
    tags: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    extra: { type: 'string' },
    workMode: { type: 'string' },
    seniority: { type: 'string' },
    travel: { type: 'string' },
  },
};
