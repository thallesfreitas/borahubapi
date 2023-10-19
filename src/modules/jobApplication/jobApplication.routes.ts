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

  fastify.post<{ Body: Model.CreateFeedbackRecruiterArgs }>(
    '/createFeedbackRecruiter',
    {
      schema: { body: Schema.createFeedbackRecruiterBody },
      onSend,
    },
    Controller.createFeedbackRecruiter
  );

  fastify.post<{ Body: Model.GetAssessmentArgs }>(
    '/getFeedbackAssessment',
    {
      schema: { body: Schema.getAssessmentBody },
      onSend,
    },
    Controller.getFeedbackAssessment
  );
};
