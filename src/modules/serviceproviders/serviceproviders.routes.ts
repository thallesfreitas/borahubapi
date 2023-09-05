import { FastifyInstance } from 'fastify';
import { onSend } from '../../utils/hooks/onSend';
import * as Controller from './serviceproviders.controller';
import * as Model from './serviceproviders.model';
import * as Schema from './serviceproviders.schema';
import * as Serializer from './serviceproviders.serializer';

export default async (fastify: FastifyInstance) => {
  fastify.post(
    '/update',
    {
      schema: {
        params: Schema.serviceProviderBody,
      },
    },
    Controller.updateServiceProvider
  );

  fastify.get<{ Querystring: Model.GetServiceProvidersByUserQuery }>(
    '/getServiceProvidersByUserId/',
    {
      schema: { querystring: Schema.getServiceProvidersByUserQuerystring },
      preSerialization: [Serializer.getServiceProvider],
      onSend,
    },
    Controller.getServiceProviderByUserId
  );

  fastify.get<{ Querystring: Model.GetServiceProvidersQuery }>(
    '/',
    {
      schema: { querystring: Schema.getServiceProvidersQuerystring },
      preSerialization: [
        Serializer.insertPagination,
        Serializer.getServiceProviders,
      ],
      onSend,
    },
    Controller.getServiceProviders
  );
};
