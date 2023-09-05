import { FastifyInstance } from 'fastify';
import { onSend } from '../../utils/hooks/onSend';
import * as Controller from './candidate.controller';
import * as Model from './candidate.model';
import * as Schema from './candidate.schema';
import * as Serializer from './candidate.serializer';

export default async (fastify: FastifyInstance) => {
  // fastify.post(
  //   '/',
  //   {
  //     schema: {
  //       params: Schema.candidateBody,
  //     },
  //   },
  //   Controller.createCandidate
  // );
  fastify.post(
    '/update',
    {
      schema: {
        params: Schema.candidateBody,
      },
    },
    Controller.updateCandidate
  );

  fastify.get<{ Querystring: Model.GetCandidatesByUserQuery }>(
    '/getCandidatesByUserId/',
    {
      schema: { querystring: Schema.getCandidatesByUserQuerystring },
      preSerialization: [Serializer.getCandidate],
      onSend,
    },
    Controller.getCandidateByUserId
  );

  fastify.get<{ Querystring: Model.GetCandidatesQuery }>(
    '/',
    {
      schema: { querystring: Schema.getCandidatesQuerystring },
      preSerialization: [Serializer.insertPagination, Serializer.getCandidates],
      onSend,
    },
    Controller.getCandidates
  );
};
