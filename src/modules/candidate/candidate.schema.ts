export const getCandidateByIdParams = {
  type: 'object',
  additionalProperties: false,
  required: ['createdBy'],
  properties: {
    createdBy: {
      type: 'number',
    },
  },
};

export const getCandidatesQuerystring = {
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

export const getCandidatesByUserQuerystring = {
  type: 'object',
  additionalProperties: false,
  required: ['userId'],
  properties: {
    userId: { type: 'number' },
  },
};

export const candidateBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    userId: { type: 'number' },
    description: { type: 'string' },
    avatar: { type: 'string' },
    banner: { type: 'string' },
    link: { type: 'string' },
    actualRole: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    extra: { type: 'string' },
    salary: { type: 'array' },
    contractMode: { type: 'array' },
    workMode: { type: 'array' },
    seniority: { type: 'array' },
    travel: { type: 'array' },
    affirmative: { type: 'array' },
    areas: { type: 'array' },
    categories: { type: 'array' },
    tags: { type: 'array' },
  },
};
