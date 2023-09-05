export const getUserBySlugParams = {
  type: 'object',
  additionalProperties: false,
  required: ['slug'],
  properties: {
    slug: {
      type: 'string',
    },
  },
};
export const getUserByEmailParams = {
  type: 'object',
  additionalProperties: false,
  required: ['email'],
  properties: {
    email: {
      type: 'string',
    },
  },
};
export const getUserByIdParams = {
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: {
      type: 'number',
    },
  },
};

export const createUserBody = {
  type: 'object',
  additionalProperties: false,
  required: ['email', 'name', 'phone'],
  properties: {
    email: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    indicatedBy: {
      type: 'string',
    },
    // password: {
    //   type: 'string',
    // },
    optin: {
      type: 'boolean',
    },
  },
};

export const updateUserBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    id: { type: 'number' },
    optin: { type: 'boolean' },
    indicatedBy: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    name: { type: 'string' },
    phone: { type: 'string' },
    isCandidate: { type: 'boolean' },
    isRecruiter: { type: 'boolean' },
    isServiceProvider: { type: 'boolean' },
    isFreelancer: { type: 'boolean' },
  },
};
