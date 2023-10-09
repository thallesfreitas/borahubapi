import * as JobsRepository from './jobs.repository';

export const createJob = (params: JobsRepository.CreateJobArgs) =>
  JobsRepository.createJob(params);

export const getJobs = (limit: number, skip: number) =>
  JobsRepository.getJobs(limit, skip);

export const getJobsCount = () => JobsRepository.getJobsCount();

export const getJobsByUserCount = (createdBy: number) =>
  JobsRepository.getJobsByUserCount(createdBy);

export const getJobsByUserSlugCount = (slug: string) =>
  JobsRepository.getJobsByUserSlugCount(slug);

export const getJobsByUserSlug = (
  slug: string,
  limit: number,
  skip: number,
  isActive: boolean
) => JobsRepository.getJobsByUserSlug(slug, limit, skip, isActive);

export const getJobBySlug = (slug: string) => JobsRepository.getJobBySlug(slug);

export const getJobsByUserId = (
  createdBy: number,
  limit: number,
  skip: number
) => JobsRepository.getJobsByUserId(createdBy, limit, skip);

export const updateJob = (params: JobsRepository.UpdateJobArgs) =>
  JobsRepository.updateJob(params);

export const deleteJob = (id: number, userId: number) =>
  JobsRepository.deleteJob(id, userId);

export const getJob = (id: number) => JobsRepository.getJob(id);
