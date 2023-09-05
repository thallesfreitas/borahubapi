export const aiBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    userId: { type: 'number' },
    prompt: { type: 'string' },
  },
};
export const ChoiceCandidateJobBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    userId: { type: 'number' },
    promptJob: { type: 'string' },
    promptCandidate1: { type: 'string' },
    promptCandidate2: { type: 'string' },
  },
};
