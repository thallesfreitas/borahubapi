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
    '/sendMessageToGroup',
    {
      schema: {
        body: WhatsSchema.sendMessage,
      },
      onSend,
      preSerialization: [Serializer.message],
    },
    WhatsController.sendMessageWhats
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
