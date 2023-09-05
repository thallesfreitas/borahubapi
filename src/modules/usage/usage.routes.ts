import { FastifyInstance } from 'fastify';
import * as Controller from './usage.controller';
import * as Schema from './usage.schema';

export default async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: { body: Schema.getUsage } }, Controller.getUsage);
};
