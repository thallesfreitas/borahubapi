import * as PaymentRepository from './payment.repository';

const mercadopago = require('mercadopago');

// mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
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
  console.log('customer');
  console.log(customer);
  if (customer.body.results.length === 0) {
    console.log('customer.body.results.length');
    console.log(customer.body.results.length);
    customer = await mercadopago.customers.create(customer);
  }
  console.log(customer);

  return customer.id;
};
