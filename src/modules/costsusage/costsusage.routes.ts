import { FastifyInstance } from 'fastify';
import * as Controller from './costsusage.controller';
import * as Schema from './costsusage.schema';

export default async (fastify: FastifyInstance) => {
  fastify.post(
    '/',
    { schema: { body: Schema.getUsage } },
    Controller.getCostsUsage
  );

  fastify.post(
    '/add',
    { schema: { body: Schema.addUsage } },
    Controller.addCostsUsage
  );

  fastify.post(
    '/remove',
    { schema: { body: Schema.getUsage } },
    Controller.removeCostsUsage
  );
};
