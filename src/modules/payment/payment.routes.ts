import { FastifyInstance } from 'fastify';
import * as Controller from './payment.controller';
import * as Schema from './payment.schema';

export default async (fastify: FastifyInstance) => {
  fastify.post(
    '/',
    { schema: { body: Schema.paymentBody } },
    Controller.payment
  );

  fastify.post(
    '/getCustomer',
    { schema: { body: Schema.paymentBody } },
    Controller.getCustomer
  );

  fastify.post(
    '/getPayment/:id',
    { schema: { body: Schema.getPaymentBody } },
    Controller.getPayment
  );

  fastify.post(
    '/webhookMP',
    { schema: { body: Schema.webhookMP } },
    Controller.webhookMP
  );

  fastify.post(
    '/ipnMP',
    { schema: { body: Schema.webhookMP } },
    Controller.ipnMP
  );
};
