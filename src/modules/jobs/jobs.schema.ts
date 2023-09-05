export const jobBody = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'userId'],
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    descriptionCompany: { type: 'string' },
    modelOfWork: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    salary: { type: 'array' },
    experience: { type: 'string' },
    categories: { type: 'array' },
    areas: { type: 'array' },
    tags: { type: 'array' },
    extra: { type: 'string' },
    company: { type: 'string' },
    phone: { type: 'string' },
    email: { type: 'string' },
    userId: { type: 'number' },
    isActive: { type: 'boolean' },
    sendToAllGroups: { type: 'boolean' },
    sendToSelectedGroup: { type: 'boolean' },
  },
};
export const jobBodyUpdate = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'id'],
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    descriptionCompany: { type: 'string' },
    modelOfWork: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    salary: { type: 'array' },
    experience: { type: 'string' },
    categories: { type: 'array' },
    areas: { type: 'array' },
    tags: { type: 'array' },
    extra: { type: 'string' },
    company: { type: 'string' },
    phone: { type: 'string' },
    email: { type: 'string' },
    userId: { type: 'number' },
    isActive: { type: 'boolean' },
    sendToAllGroups: { type: 'boolean' },
    sendToSelectedGroup: { type: 'boolean' },
  },
};

export const getJobsQuerystring = {
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

export const getJobsByUserQuerystring = {
  type: 'object',
  additionalProperties: false,
  required: ['userId', 'limit', 'skip'],
  properties: {
    userId: { type: 'number' },
    limit: {
      type: 'number',
    },
    skip: {
      type: 'number',
    },
  },
};
export const getJobsByUserSlugQuerystring = {
  type: 'object',
  additionalProperties: false,
  required: ['slug', 'limit', 'skip'],
  properties: {
    slug: { type: 'string' },
    limit: {
      type: 'number',
    },
    skip: {
      type: 'number',
    },
    isActive: {
      type: 'boolean',
    },
  },
};

export const relatedJobsBody = {
  type: 'object',
  additionalProperties: false,
  required: ['relatedJobIds', 'userId'],
  properties: {
    relatedJobIds: {
      type: 'string',
      items: {
        type: 'number',
      },
    },
    userId: {
      type: 'number',
    },
  },
};
