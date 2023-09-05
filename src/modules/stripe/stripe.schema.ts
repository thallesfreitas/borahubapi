export const CreateSubscriptionBody = {
  type: 'object',
  additionalProperties: false,
  properties: {
    customerId: {
      type: 'string',
    },
    priceId: {
      type: 'string',
    },
  },
};

export const GetPaymentMethodsBody = {
  type: 'object',
  additionalProperties: false,
  properties: {
    customerId: { type: 'string' },
  },
};

export const PaymentBody = {
  type: 'object',
  additionalProperties: false,
  properties: {
    customerId: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    userId: { type: 'string' },
    clientSecret: { type: 'string' },
    subscriptionId: { type: 'string' },
    priceSubscription: { type: 'string' },
    priceIdSubscription: { type: 'string' },
    name: { type: 'string' },
    nameSubscription: { type: 'string' },
    cardName: { type: 'string' },
    cpf: { type: 'string' },
    cardNumber: { type: 'string' },
    exp_month: { type: 'string' },
    exp_year: { type: 'string' },
    cardCVV: { type: 'string' },
  },
};

export const SubscriptionBody = {
  type: 'object',
  additionalProperties: false,
  properties: {
    customerId: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    userId: { type: 'string' },
    clientSecret: { type: 'string' },
    subscriptionId: { type: 'string' },
    priceSubscription: { type: 'string' },
    priceIdSubscription: { type: 'string' },
    name: { type: 'string' },
    nameSubscription: { type: 'string' },
    cardName: { type: 'string' },
    cpf: { type: 'string' },
    cardNumber: { type: 'string' },
    exp_month: { type: 'string' },
    exp_year: { type: 'string' },
    cardCVV: { type: 'string' },
  },
};

export const defaultBody = {
  type: 'object',
  additionalProperties: false,
};
