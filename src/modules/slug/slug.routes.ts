import { FastifyInstance } from 'fastify';
import { onSend } from '../../utils/hooks/onSend';
import * as Controller from './slug.controller';
import * as Model from './slug.model';
import * as Schema from './slug.schema';
import * as Serializer from './slug.serializer';

export default async (fastify: FastifyInstance) => {
  // fastify.addHook('onRequest', fastify.authenticate);

  fastify.get<Model.SlugParams>(
    '/:slug',
    {
      onSend,
      schema: {
        params: Schema.getBySlugParams,
      },
      preSerialization: Serializer.getBySlug,
    },
    Controller.getBySlug
  );
};
