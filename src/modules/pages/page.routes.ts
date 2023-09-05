import { FastifyInstance } from 'fastify';
import * as Controller from './page.controller';
import * as Serializer from './page.serializer';

export default async (fastify: FastifyInstance) => {
  fastify.get(
    '/:pageSlug',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            pageSlug: { type: 'string' },
          },
        },
      },
      onSend: Serializer.getPage,
    },
    Controller.getPage
  );
};
