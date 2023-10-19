import { FastifyReply } from 'fastify';
import {
  CreateAssessmentJobApplicationRequest,
  CreateFeedbackRecruiterRequest,
  CreateJobApplicationRequest,
  GetAssessmentRequest,
} from './jobApplication.model';
import * as JobsService from './jobApplication.service';

export const getFeedbackAssessment = async (
  request: GetAssessmentRequest,
  reply: FastifyReply
) => {
  const jobs = await JobsService.getFeedbackAssessment(request.body);
  return reply.send(jobs);
};

export const createAssessment = async (
  request: CreateAssessmentJobApplicationRequest,
  reply: FastifyReply
) => {
  const jobs = await JobsService.createAssessment(request.body);

  return reply.send(jobs);
};
export const createFeedbackRecruiter = async (
  request: CreateFeedbackRecruiterRequest,
  reply: FastifyReply
) => {
  const jobs = await JobsService.createFeedbackRecruiter(request.body);

  return reply.send(jobs);
};

export const createJobApplication = async (
  request: CreateJobApplicationRequest,
  reply: FastifyReply
) => {
  const jobs = await JobsService.createJobApplication(request.body);

  return reply.send(jobs);
};
