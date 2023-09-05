import { FastifyInstance } from 'fastify';
import * as Controller from './stripe.controller';
import * as Schema from './stripe.schema';

export default async (fastify: FastifyInstance) => {
  // fastify.addHook('onRequest', fastify.authenticate);

  fastify.post(
    '/webhook',
    {
      schema: {
        body: Schema.defaultBody,
      },
    },
    Controller.callWebhook
  );

  fastify.post(
    '/get_plans_candidates',
    {
      schema: {
        body: Schema.defaultBody,
      },
    },
    Controller.getPlansCandidates
  );

  fastify.post(
    '/getPriceCredits',
    {
      schema: {
        body: Schema.defaultBody,
      },
    },
    Controller.getPriceCredits
  );

  fastify.post(
    '/get_payments_methods',
    {
      schema: {
        body: Schema.GetPaymentMethodsBody,
      },
    },
    Controller.getPaymentsMethods
  );

  fastify.post(
    '/get_portal',
    {
      schema: {
        body: Schema.GetPaymentMethodsBody,
      },
    },
    Controller.getPortal
  );

  fastify.post(
    '/get_status_subscription',
    {
      schema: {
        body: Schema.GetPaymentMethodsBody,
      },
    },
    Controller.getStatusSubscription
  );

  fastify.post(
    '/create-subscription',
    {
      schema: {
        body: Schema.CreateSubscriptionBody,
      },
    },
    Controller.CreateSubscription
  );

  fastify.post(
    '/subscription',
    {
      schema: {
        body: Schema.SubscriptionBody,
      },
    },
    Controller.Subscription
  );

  fastify.post(
    '/payment',
    {
      schema: {
        body: Schema.PaymentBody,
      },
    },
    Controller.Payment
  );
};
