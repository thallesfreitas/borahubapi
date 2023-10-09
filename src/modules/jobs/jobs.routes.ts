import { FastifyInstance } from 'fastify';
import { onSend } from '../../utils/hooks/onSend';
import * as Controller from './jobs.controller';
import * as Model from './jobs.model';
import * as Schema from './jobs.schema';
import * as Serializer from './jobs.serializer';

export default async (fastify: FastifyInstance) => {
  fastify.post<{ Body: Model.JobBody }>(
    '/',
    {
      schema: { body: Schema.jobBody },
      onSend,
    },
    Controller.createJob
  );

  fastify.get<{ Querystring: Model.GetJobsQuery }>(
    '/',
    {
      schema: { querystring: Schema.getJobsQuerystring },
      preSerialization: [Serializer.insertPagination, Serializer.getJobs],
      onSend,
    },
    Controller.getJobs
  );

  fastify.get<{ Querystring: Model.GetJobsByUserQuery }>(
    '/getJobsByUserId/',
    {
      schema: { querystring: Schema.getJobsByUserQuerystring },
      preSerialization: [Serializer.insertPagination, Serializer.getJobs],
      onSend,
    },
    Controller.getJobsByUserId
  );

  fastify.get<{ Querystring: Model.GetJobsByUserSlugQuery }>(
    '/getJobsByUserSlug',
    {
      schema: { querystring: Schema.getJobsByUserSlugQuerystring },
      preSerialization: [Serializer.insertPagination, Serializer.getJobs],
      onSend,
    },
    Controller.getJobsByUserSlug
  );

  fastify.get<{ Params: Model.GetJobBySlugParams }>(
    '/getJobBySlug/:slug',
    {
      preSerialization: [Serializer.getJob],
      onSend,
    },
    Controller.getJobBySlug
  );

  fastify.put<{ Params: { id: number }; Body: Model.JobBody }>(
    '/:id',
    {
      schema: { body: Schema.jobBodyUpdate },
      onSend,
    },
    Controller.updateJob
  );

  fastify.delete<{ Params: { id: number } }>('/:id', Controller.deleteJob);
};
