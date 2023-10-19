import { FastifyInstance } from 'fastify';
import { onSend } from '../../utils/hooks/onSend';
import { WhatsSchema } from './index';
import * as WebhookController from './webhook.controller';
import * as WhatsController from './whats.controller';
import * as Serializer from './whats.serializer';

export default async (fastify: FastifyInstance) => {
  fastify.get(
    '/webhookAPI',
    {
      onSend,
    },
    WebhookController.webhookAPIGet
  );
  fastify.post(
    '/webhookAPI',
    {
      onSend,
    },
    WebhookController.webhookAPIpost
  );
  fastify.post(
    '/webhook',
    {
      onSend,
    },
    WebhookController.webhook
  );

  fastify.post(
    '/groups',
    {
      onSend,
    },
    WhatsController.getGroups
  );

  fastify.post(
    '/sendMessageWithTemplate',
    {
      schema: {
        body: WhatsSchema.sendMessage,
      },
      onSend,
      preSerialization: [Serializer.message],
    },
    WhatsController.sendMessageWithTemplate
  );

  fastify.post(
    '/startBoraBot',
    {
      schema: {
        body: WhatsSchema.startBoraBot,
      },
      // onSend,
      // preSerialization: [Serializer.message],
    },
    WhatsController.startBoraBot
  );

  // fastify.post(
  //   '/TESTEsendMessageToGroup',
  //   {
  //     schema: {
  //       body: WhatsSchema.sendMessageToGroups,
  //     },
  //     onSend,
  //     preSerialization: [Serializer.message],
  //   },
  //   WhatsController.sendMessageToGroups
  // );

  fastify.post(
    '/sendMessageToGroup',
    { schema: { body: WhatsSchema.sendMessageToGroups } },
    WhatsController.sendMessageToGroups
  );

  // WPP CONNECT
  fastify.get(
    '/connectwpp',
    {
      onSend,
    },
    WhatsController.connectWP
  );
};
