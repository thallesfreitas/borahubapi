import { FastifyReply } from 'fastify';
import {
  CreateJobRequest,
  DeleteJobRequest,
  GetJobBySlugRequest,
  GetJobsByUserRequest,
  GetJobsByUserSlugRequest,
  GetJobsRequest,
  UpdateJobRequest,
} from './jobs.model';
import * as JobsService from './jobs.service';

export const createJob = async (
  request: CreateJobRequest,
  reply: FastifyReply
) => {
  const jobs = await JobsService.createJob(request.body);

  return reply.send(jobs);
};

export const getJobs = async (request: GetJobsRequest, reply: FastifyReply) => {
  const { limit, skip } = request.query;

  const [jobs, jobsCount] = await Promise.all([
    JobsService.getJobs(limit, skip),
    JobsService.getJobsCount(),
  ]);

  return reply.send({
    count: jobsCount,
    data: jobs,
  });
};

export const getJobsByUserId = async (
  request: GetJobsByUserRequest,
  reply: FastifyReply
) => {
  const { userId, limit, skip } = request.query;

  const [jobs, jobsCount] = await Promise.all([
    JobsService.getJobsByUserId(userId, limit, skip),
    JobsService.getJobsByUserCount(userId),
  ]);

  return reply.send({
    count: jobsCount,
    data: jobs,
  });
};

export const getJobsByUserSlug = async (
  request: GetJobsByUserSlugRequest,
  reply: FastifyReply
) => {
  const { slug, limit, skip, isActive } = request.query;

  const [jobs, jobsCount] = await Promise.all([
    JobsService.getJobsByUserSlug(slug, limit, skip, isActive),
    JobsService.getJobsByUserSlugCount(slug),
  ]);

  return reply.send({
    count: jobsCount,
    data: jobs,
  });
};
export const getJobBySlug = async (
  request: GetJobBySlugRequest,
  reply: FastifyReply
) => {
  const { slug } = request.params;

  const jobs = await JobsService.getJobBySlug(slug);
  return reply.send(jobs);
};

export const updateJob = async (
  request: UpdateJobRequest,
  reply: FastifyReply
) => {
  const { id } = request.params;

  const jobs = await JobsService.updateJob({
    ...request.body,
    id: Number(id),
  });

  return reply.send(jobs);
};

export const deleteJob = async (
  request: DeleteJobRequest,
  reply: FastifyReply
) => {
  const { id } = request.params;

  await JobsService.deleteJob(Number(id));

  return reply.status(204).send();
};
