import { FastifyInstance } from 'fastify';
import { onSend } from '../../utils/hooks/onSend';
import * as Controller from './jobApplication.controller';
import * as Model from './jobApplication.model';
import * as Schema from './jobApplication.schema';

export default async (fastify: FastifyInstance) => {
  fastify.post<{ Body: Model.CreateJobApplicationArgs }>(
    '/',
    {
      schema: { body: Schema.jobApplicationBody },
      onSend,
    },
    Controller.createJobApplication
  );

  fastify.post<{ Body: Model.CreateAssessmentJobApplicationArgs }>(
    '/createAssessment',
    {
      schema: { body: Schema.createAssessmentJobApplicationBody },
      onSend,
    },
    Controller.createAssessment
  );
};
