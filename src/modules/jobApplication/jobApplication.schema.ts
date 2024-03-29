export const createFeedbackRecruiterBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    id: { type: 'string' },
    feedbackrecruiter: { type: 'string' },
  },
};
export const getAssessmentBody = {
  type: 'object',
  additionalProperties: false,
  required: ['userslug', 'jobslug'],
  properties: {
    userslug: { type: 'string' },
    jobslug: { type: 'string' },
  },
};
export const createAssessmentJobApplicationBody = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'userId', 'jobId'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    userId: { type: 'number' },
    jobId: { type: 'number' },
    phone: { type: 'string' },
    email: { type: 'string' },
    terms: { type: 'boolean' },
  },
};
export const favoriteApplicationBody = {
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: { type: 'number' },
  },
};

export const jobApplicationBody = {
  type: 'object',
  additionalProperties: false,
  required: ['userId', 'jobId'],
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    userId: { type: 'number' },
    jobId: { type: 'number' },
    phone: { type: 'string' },
    email: { type: 'string' },
    terms: { type: 'boolean' },
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
