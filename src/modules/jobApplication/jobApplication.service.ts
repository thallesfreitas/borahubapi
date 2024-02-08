import {
  CreateAssessmentJobApplicationArgs,
  CreateFeedbackRecruiterArgs,
  CreateJobApplicationArgs,
  GetAssessmentArgs,
  UpdateJobApplicationArgs,
} from './jobApplication.model';
import * as JobsApplicationRepository from './jobApplication.repository';

export const getFeedbackAssessment = (params: GetAssessmentArgs) =>
  JobsApplicationRepository.getFeedbackAssessment(params);

export const createFeedbackRecruiter = (params: CreateFeedbackRecruiterArgs) =>
  JobsApplicationRepository.createFeedbackRecruiter(params);

export const createAssessment = (params: CreateAssessmentJobApplicationArgs) =>
  JobsApplicationRepository.createAssessment(params);

export const createJobApplication = (params: CreateJobApplicationArgs) =>
  JobsApplicationRepository.createJobApplication(params);

export const favoriteJobApplication = (id: number) =>
  JobsApplicationRepository.favoriteJobApplication(id);

export const getJobs = (limit: number, skip: number) =>
  JobsApplicationRepository.getJobs(limit, skip);

export const getJobsCount = () => JobsApplicationRepository.getJobsCount();

export const getJobsByUserCount = (createdBy: number) =>
  JobsApplicationRepository.getJobsByUserCount(createdBy);

export const getJobsByUserSlugCount = (slug: string) =>
  JobsApplicationRepository.getJobsByUserSlugCount(slug);

export const getJobsByUserSlug = (
  slug: string,
  limit: number,
  skip: number,
  isActive: boolean
) => JobsApplicationRepository.getJobsByUserSlug(slug, limit, skip, isActive);

export const getJobBySlug = (slug: string) =>
  JobsApplicationRepository.getJobBySlug(slug);

export const getJobsByUserId = (
  createdBy: number,
  limit: number,
  skip: number
) => JobsApplicationRepository.getJobsByUserId(createdBy, limit, skip);

export const updateJobApplication = (params: UpdateJobApplicationArgs) =>
  JobsApplicationRepository.updateJobApplication(params);

export const deleteJob = (id: number) =>
  JobsApplicationRepository.deleteJob(id);

export const getJob = (id: number) => JobsApplicationRepository.getJob(id);
