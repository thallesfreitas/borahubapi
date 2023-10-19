export const createCardTokenBody = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    cardNumber: { type: 'string' },
    cardholderName: { type: 'string' },
    cardExpirationMonth: { type: 'string' },
    cardExpirationYear: { type: 'string' },
    securityCode: { type: 'string' },
    identificationType: { type: 'string' },
    identificationNumber: { type: 'string' },
  },
};

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
