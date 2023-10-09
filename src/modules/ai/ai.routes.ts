/* eslint-disable security/detect-object-injection */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { FastifyInstance } from 'fastify';
import * as Controller from './ai.controller';
import * as Schema from './ai.schema';

export default async (fastify: FastifyInstance) => {
  fastify.post(
    '/',
    {
      schema: {
        params: Schema.aiBody,
      },
    },
    Controller.chat
  );

  fastify.post(
    '/test',
    {
      schema: {
        params: Schema.aiBody,
      },
    },
    Controller.test
  );

  fastify.post(
    '/completion',
    {
      schema: {
        params: Schema.aiBody,
      },
    },
    Controller.completion
  );
  // fastify.post(
  //   '/completionStream',
  //   {
  //     schema: {
  //       params: Schema.aiBody,
  //     },
  //   },
  //   Controller.completionStream
  // );

  fastify.post(
    '/createImage',
    {
      schema: {
        params: Schema.aiBody,
      },
    },
    Controller.createImage
  );
  //
  fastify.post(
    '/choiceCandidateJob',
    {
      schema: {
        params: Schema.ChoiceCandidateJobBody,
      },
    },
    Controller.ChoiceCandidateJob
  );
};
