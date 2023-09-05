import { FastifyInstance } from 'fastify';
import * as Controller from './packs.controller';
import * as Schema from './packs.schema';

export default async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: {} }, Controller.getPacks);

  fastify.post(
    '/:type',
    { schema: { body: Schema.getPack } },
    Controller.getPack
  );

  fastify.post(
    '/create',
    { schema: { body: Schema.createPack } },
    Controller.createPack
  );
};
