import { FastifyInstance } from 'fastify';
import * as ContactController from './contact.controller';
import * as ContactModel from './contact.model';
import * as ContactSchema from './contact.schema';

export default async (fastify: FastifyInstance) => {
  fastify.post<{
    Body: ContactModel.SendMessage;
  }>(
    '/',
    {
      schema: {
        body: ContactSchema.SendMessage,
      },
    },
    ContactController.sendMessage
  );
};
