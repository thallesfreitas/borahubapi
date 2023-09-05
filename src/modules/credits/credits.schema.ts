export const getCreditsHistoryBody = {
  type: 'object',
  additionalProperties: false,
  required: ['creditId'],
  properties: {
    creditId: { type: 'number' },
  },
};

export const getCreditsBody = {
  type: 'object',
  additionalProperties: false,
  required: ['userId'],
  properties: {
    userId: { type: 'number' },
  },
};

export const verifyBody = {
  type: 'object',
  additionalProperties: false,
  required: ['userId'],
  properties: {
    userId: { type: 'number' },
    type: { type: 'string' },
  },
};

export const addCreditsBody = {
  type: 'object',
  additionalProperties: false,
  required: ['userId', 'amount', 'transactionType'],
  properties: {
    userId: { type: 'number' },
    amount: { type: 'number' },
    transactionType: { type: 'string' },
  },
};

export const removeCreditsBody = {
  type: 'object',
  additionalProperties: false,
  required: ['userId', 'type'],
  properties: {
    userId: { type: 'number' },
    type: { type: 'string' },
  },
};
