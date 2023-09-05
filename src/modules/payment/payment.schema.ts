export const paymentBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    userName: { type: 'string' },
    typePack: { type: 'string' },
    userPhone: { type: 'string' },
    paymentData: { type: 'object' },
  },
};

export const getPaymentBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    id: { type: 'number' },
  },
};

export const webhookMP = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {},
};
