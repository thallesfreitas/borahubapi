export const aiBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    tokens: { type: 'number' },
    model: { type: 'string' },
    userId: { type: 'number' },
    prompt: { type: 'string' },
  },
};

export const aiTestBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    prompt: { type: 'string' },
  },
};

export const ChoiceCandidateJobBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    tokens: { type: 'number' },
    model: { type: 'string' },
    userId: { type: 'number' },
    promptJob: { type: 'string' },
    promptCandidate1: { type: 'string' },
    promptCandidate2: { type: 'string' },
  },
};
