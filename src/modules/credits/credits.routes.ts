import { FastifyInstance } from 'fastify';
import * as Controller from './credits.controller';
import * as Schema from './credits.schema';

export default async (fastify: FastifyInstance) => {
  fastify.post(
    '/',
    { schema: { body: Schema.getCreditsBody } },
    Controller.getCredits
  );

  fastify.post(
    '/verify',
    { schema: { body: Schema.verifyBody } },
    Controller.verify
  );

  fastify.post(
    '/getCreditsHistory',
    { schema: { body: Schema.getCreditsHistoryBody } },
    Controller.getCreditsHistory
  );

  fastify.post(
    '/addCredits',
    { schema: { body: Schema.addCreditsBody } },
    Controller.addCredits
  );

  fastify.post(
    '/removeCredits',
    { schema: { body: Schema.removeCreditsBody } },
    Controller.removeCredits
  );
};
