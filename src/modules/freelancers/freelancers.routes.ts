import { FastifyInstance } from 'fastify';
import { onSend } from '../../utils/hooks/onSend';
import * as Controller from './freelancers.controller';
import * as Model from './freelancers.model';
import * as Schema from './freelancers.schema';
import * as Serializer from './freelancers.serializer';

export default async (fastify: FastifyInstance) => {
  fastify.post(
    '/update',
    {
      schema: {
        params: Schema.freelancerBody,
      },
    },
    Controller.updateFreelancer
  );

  fastify.get<{ Querystring: Model.GetFreelancersByUserQuery }>(
    '/getFreelancersByUserId/',
    {
      schema: { querystring: Schema.getFreelancersByUserQuerystring },
      preSerialization: [Serializer.getFreelancer],
      onSend,
    },
    Controller.getFreelancerByUserId
  );

  fastify.get<{ Querystring: Model.GetFreelancersQuery }>(
    '/',
    {
      schema: { querystring: Schema.getFreelancersQuerystring },
      preSerialization: [
        Serializer.insertPagination,
        Serializer.getFreelancers,
      ],
      onSend,
    },
    Controller.getFreelancers
  );
};
