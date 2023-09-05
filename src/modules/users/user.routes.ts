import { FastifyInstance } from 'fastify';
import { onSend } from '../../utils/hooks/onSend';
import * as Controller from './user.controller';
import * as Model from './user.model';
import * as Schema from './user.schema';
import * as Serializer from './user.serializer';

export default async (fastify: FastifyInstance) => {
  // fastify.addHook('onRequest', fastify.authenticate);

  fastify.post(
    '/create',
    {
      schema: {
        body: Schema.createUserBody,
      },
    },
    Controller.createUser
  );

  fastify.post(
    '/update',
    {
      schema: {
        params: Schema.updateUserBody,
      },
    },
    Controller.updateUser
  );

  fastify.get<Model.UserIdParams>(
    '/:id',
    {
      onSend,
      schema: {
        params: Schema.getUserByIdParams,
      },
      preSerialization: Serializer.getUserById,
    },
    Controller.getUserById
  );

  fastify.get<Model.UserParams>(
    '/getByEmail/:email',
    {
      onSend,
      schema: {
        params: Schema.getUserByEmailParams,
      },
      preSerialization: Serializer.getUserByEmail,
    },
    Controller.getUserByEmail
  );
  fastify.get<Model.UserParams>(
    '/getBySlug/:slug',
    {
      onSend,
      schema: {
        params: Schema.getUserBySlugParams,
      },
      preSerialization: Serializer.getUserBySlug,
    },
    Controller.getUserBySlug
  );
};
