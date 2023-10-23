import * as PaymentRepository from './payment.repository';

const mercadopago = require('mercadopago');

mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN_TEST);

export const payment = async (userId: number) =>
  PaymentRepository.payment(userId);

export const getOrCreateCustomer = async (email: string) => {
  const client = {
    email,
  };
  let customer = await mercadopago.customers.search({
    qs: client,
  });

  if (customer.body.results.length === 0) {
    customer = await mercadopago.customers.create(customer);
    return customer.body.id;
  }
  return customer.body.results[0].id;
};
