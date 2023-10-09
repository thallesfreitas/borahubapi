import { FastifyReply } from 'fastify';
import {
  CreateAssessmentJobApplicationRequest,
  CreateJobApplicationRequest,
} from './jobApplication.model';
import * as JobsService from './jobApplication.service';

export const createAssessment = async (
  request: CreateAssessmentJobApplicationRequest,
  reply: FastifyReply
) => {
  const jobs = await JobsService.createAssessment(request.body);

  return reply.send(jobs);
};

export const createJobApplication = async (
  request: CreateJobApplicationRequest,
  reply: FastifyReply
) => {
  const jobs = await JobsService.createJobApplication(request.body);

  return reply.send(jobs);
};
