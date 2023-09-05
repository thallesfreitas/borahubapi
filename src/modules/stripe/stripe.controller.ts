import { FastifyReply } from 'fastify';
import dbClient from '../../lib/dbClient';
import { checkToken } from '../token/token.service';
import * as UserService from '../users/user.service';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

export const Payment = async (request: any, reply: FastifyReply) => {
  const {
    customerId,
    email,
    phone,
    userId,
    clientSecret,
    subscriptionId,
    priceSubscription,
    priceIdSubscription,
    name,
    nameSubscription,
    cardNumber,
    cpf,
    cardName,
    exp_month,
    exp_year,
    cardCVV,
  } = request.body;
};
export const Subscription = async (request: any, reply: FastifyReply) => {
  const {
    customerId,
    email,
    phone,
    userId,
    clientSecret,
    subscriptionId,
    priceSubscription,
    priceIdSubscription,
    name,
    nameSubscription,
    cardNumber,
    cpf,
    cardName,
    exp_month,
    exp_year,
    cardCVV,
  } = request.body;

  try {
    let user = await UserService.getUserByEmail(email);
    const token = request.headers.authorization?.split(' ')[1];

    if (!user) {
      user = await UserService.createUser({
        email,
        name,
        phone,
        indicatedBy: '',
        password: '',
        optin: true,
      });
    } else if (!token || token === 'undefined') {
      if (!checkToken(token)) {
        reply.send({
          status: false,
          message:
            'Dados já cadastrados em nosso sistema. Favor logar para seguir.',
        });
        return false;
      }
    }

    let subscriptionDB = await dbClient.subscription.findFirst({
      where: {
        // createdBy: userId || user?.id,
        createdBy: user.id as number,
      },
    });

    if (subscriptionDB) {
      const subscriptions = await stripe.subscriptions.retrieve(
        subscriptionDB?.stripe_id
      );

      if (
        subscriptions.status === 'trialing' ||
        (subscriptions.status === 'active' &&
          subscriptions.plan.id === priceIdSubscription)
      ) {
        return await reply.send({
          status: false,
          message:
            'Você já possui uma assinatura ativa ou em período de teste para esse plano',
        });
      }
    }

    let subscription = await stripe.subscriptions.create({
      customer: customerId || user?.stripe_id,
      items: [
        {
          price: priceIdSubscription,
        },
      ],
      trial_period_days: 1,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      proration_behavior: 'always_invoice',
    });

    subscriptionDB = await dbClient.subscription.create({
      data: {
        createdById: { connect: { id: user.id } },
        updatedById: { connect: { id: user.id } },
        type: nameSubscription,
        priceId: priceIdSubscription,
        stripe_id: subscription.id,
        user_stripe_id: user.stripe_id as string,
      },
    });

    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month,
        exp_year,
        cvc: cardCVV,
      },
    });

    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customerId || user?.stripe_id,
    });

    subscription = await stripe.subscriptions.retrieve(subscription.id);

    const result = await stripe.invoices.pay(subscription.latest_invoice, {
      payment_method: paymentMethod.id,
    });

    const sendInvoice = await stripe.invoices.sendInvoice(
      subscription.latest_invoice
    );

    return await reply.send({
      status: true,
      result,
      user,
      subscription,
      subscriptionDB,
      // invoiceItem,
      sendInvoice,
    });
  } catch (errorCatch: any) {
    return reply.status(400).send({
      error: {
        type: errorCatch.type,
        message: errorCatch.message,
        error: errorCatch,
      },
    });
  }
};
export const CreateSubscription = async (request: any, reply: FastifyReply) => {
  const { customerId, priceId } = request.body;
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    reply.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (errorCatch: any) {
    return reply.status(400).send({ error: { message: errorCatch.message } });
  }
};

export const getStatusSubscription = async (
  request: any,
  reply: FastifyReply
) => {
  const { customerId } = request.body;
  let status = '';
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      // limit: 1,
    });
    subscriptions.data.forEach((subscription: { id: any; status: any }) => {
      status = subscription.status;
    });

    reply.send({
      subscriptions,
    });
  } catch (errorCatch: any) {
    return reply.status(400).send({ error: { message: errorCatch.message } });
  }
};

export const getPortal = async (request: any, reply: FastifyReply) => {
  const { customerId } = request.body;
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'https://boraajudar.work',
    });

    reply.send({
      session,
    });
  } catch (errorCatch: any) {
    return reply.status(400).send({ error: { message: errorCatch.message } });
  }
};
export const getPaymentsMethods = async (request: any, reply: FastifyReply) => {
  const { customerId } = request.body;
  try {
    const paymentMethods = await stripe.customers.listPaymentMethods(
      customerId,
      {
        type: 'card',
      }
    );
    reply.send({
      paymentMethods,
    });
  } catch (errorCatch: any) {
    return reply.status(400).send({ error: { message: errorCatch.message } });
  }
};

export const getPlansCandidates = async (request: any, reply: FastifyReply) => {
  const plans = await stripe.prices.search({
    query:
      "product:'prod_OIGJtPHYGSR6uZ' OR product:'prod_OIGIdYzisxT90S' OR product:'prod_OIGK9O8zQS4wp5' OR product:'prod_OIGTRItprYJ9MD'",
    expand: ['data.product'],
  });
  reply.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    plans: plans.data,
  });
};

export const getPriceCredits = async (request: any, reply: FastifyReply) => {
  const plans = await stripe.prices.search({
    query:
      "product:'prod_OYpI18swIa7z3Y' OR product:'prod_OYpH1GljvwjkCs' OR product:'prod_OYpGw8j2kkbFxL'",
    expand: ['data.product'],
  });
  reply.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    plans: plans.data,
  });
};

export const callWebhook = async (request: any, reply: FastifyReply) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    reply.status(400).send(`Webhook Error`);
    return;
  }

  switch (event.type) {
    case 'customer.created':
      const customerCreated = event.data.object;

      // Then define and call a function to handle the event customer.created
      break;
    case 'invoice.created':
      const invoiceCreated = event.data.object;

      // Then define and call a function to handle the event invoice.created
      break;
    case 'invoice.finalization_failed':
      const invoiceFinalizationFailed = event.data.object;

      // Then define and call a function to handle the event invoice.finalization_failed
      break;
    case 'invoice.paid':
      const invoicePaid = event.data.object;

      // Then define and call a function to handle the event invoice.paid
      break;
    case 'invoice.sent':
      const invoiceSent = event.data.object;

      // Then define and call a function to handle the event invoice.sent
      break;
    case 'payment_intent.amount_capturable_updated':
      const paymentIntentAmountCapturableUpdated = event.data.object;

      // Then define and call a function to handle the event payment_intent.amount_capturable_updated
      break;
    case 'payment_intent.canceled':
      const paymentIntentCanceled = event.data.object;

      // Then define and call a function to handle the event payment_intent.canceled
      break;
    case 'payment_intent.created':
      const paymentIntentCreated = event.data.object;

      // Then define and call a function to handle the event payment_intent.created
      break;
    case 'payment_intent.partially_funded':
      const paymentIntentPartiallyFunded = event.data.object;

      // Then define and call a function to handle the event payment_intent.partially_funded
      break;
    case 'payment_intent.payment_failed':
      const paymentIntentPaymentFailed = event.data.object;

      // Then define and call a function to handle the event payment_intent.payment_failed
      break;
    case 'payment_intent.processing':
      const paymentIntentProcessing = event.data.object;

      // Then define and call a function to handle the event payment_intent.processing
      break;
    case 'payment_intent.requires_action':
      const paymentIntentRequiresAction = event.data.object;

      // Then define and call a function to handle the event payment_intent.requires_action
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;

      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    case 'payment_method.attached':
      const paymentMethodAttached = event.data.object;

      // Then define and call a function to handle the event payment_method.attached
      break;
    case 'payment_method.automatically_updated':
      const paymentMethodAutomaticallyUpdated = event.data.object;

      // Then define and call a function to handle the event payment_method.automatically_updated
      break;
    case 'payment_method.detached':
      const paymentMethodDetached = event.data.object;

      // Then define and call a function to handle the event payment_method.detached
      break;
    case 'payment_method.updated':
      const paymentMethodUpdated = event.data.object;

      // Then define and call a function to handle the event payment_method.updated
      break;
    case 'payout.paid':
      const payoutPaid = event.data.object;

      // Then define and call a function to handle the event payout.paid
      break;
    case 'subscription_schedule.aborted':
      const subscriptionScheduleAborted = event.data.object;

      // Then define and call a function to handle the event subscription_schedule.aborted
      break;
    case 'subscription_schedule.canceled':
      const subscriptionScheduleCanceled = event.data.object;

      // Then define and call a function to handle the event subscription_schedule.canceled
      break;
    case 'subscription_schedule.completed':
      const subscriptionScheduleCompleted = event.data.object;

      // Then define and call a function to handle the event subscription_schedule.completed
      break;
    case 'subscription_schedule.created':
      const subscriptionScheduleCreated = event.data.object;

      // Then define and call a function to handle the event subscription_schedule.created
      break;
    case 'subscription_schedule.expiring':
      const subscriptionScheduleExpiring = event.data.object;

      // Then define and call a function to handle the event subscription_schedule.expiring
      break;
    case 'subscription_schedule.released':
      const subscriptionScheduleReleased = event.data.object;

      // Then define and call a function to handle the event subscription_schedule.released
      break;
    case 'subscription_schedule.updated':
      const subscriptionScheduleUpdated = event.data.object;

      // Then define and call a function to handle the event subscription_schedule.updated
      break;
    // ... handle other event types
    default:
  }

  // Return a 200 response to acknowledge receipt of the event
  return reply.send();
  // return reply.send(user);
};
