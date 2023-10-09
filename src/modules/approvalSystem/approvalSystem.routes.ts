import { FastifyInstance } from 'fastify';
import * as Controller from './approvalSystem.controller';
import * as Schema from './approvalSystem.schema';

export default async (fastify: FastifyInstance) => {
  fastify.post(
    '/',
    { schema: { body: Schema.getByIdBody } },
    Controller.getApprovalSystem
  );
};
