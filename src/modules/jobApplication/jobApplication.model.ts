import { FastifyRequest } from 'fastify';

export interface FavoriteJobApplicationArgs {
  id: number;
}
export type FavoriteJobApplicationRequest = FastifyRequest<{
  Body: FavoriteJobApplicationArgs;
}>;
export interface CreateJobApplicationArgs {
  name: string;
  description: string;
  userId: number;
  jobId: number;
  phone: string;
  email: string;
  terms: boolean;
}

export type CreateJobApplicationRequest = FastifyRequest<{
  Body: CreateJobApplicationArgs;
}>;

export interface CreateAssessmentJobApplicationArgs {
  id: number;
  name: string;
  description: string;
  userId: number;
  jobId: number;
  phone: string;
  email: string;
  terms: boolean;
}

export interface CreateFeedbackRecruiterArgs {
  id: string;
  feedbackrecruiter: string;
}

export interface GetAssessmentArgs {
  userslug: string;
  jobslug: string;
}

export type CreateFeedbackRecruiterRequest = FastifyRequest<{
  Body: CreateFeedbackRecruiterArgs;
}>;

export type GetAssessmentRequest = FastifyRequest<{
  Body: GetAssessmentArgs;
}>;
export type CreateAssessmentJobApplicationRequest = FastifyRequest<{
  Body: CreateAssessmentJobApplicationArgs;
}>;

export interface UpdateJobApplicationArgs extends CreateJobApplicationArgs {
  id: number;
}

export type GetJobsQuery = {
  limit: number;
  skip: number;
};

export type GetJobsRequest = FastifyRequest<{
  Querystring: GetJobsQuery;
}>;

export type GetJobsByUserQuery = {
  limit: number;
  skip: number;
  userId: number;
};

export type GetJobsByUserRequest = FastifyRequest<{
  Querystring: GetJobsByUserQuery;
}>;

export type GetJobsByUserSlugQuery = {
  limit: number;
  skip: number;
  slug: string;
  isActive: boolean;
};

export type GetJobsByUserSlugRequest = FastifyRequest<{
  Querystring: GetJobsByUserSlugQuery;
}>;

export type GetJobBySlugParams = {
  slug: string;
};

export type GetJobBySlugRequest = FastifyRequest<{
  Params: GetJobBySlugParams;
}>;
export type UpdateJobRequest = FastifyRequest<{
  Params: {
    id: number;
  };
  Body: CreateJobApplicationArgs;
}>;

export type DeleteJobRequest = FastifyRequest<{
  Params: {
    id: number;
  };
}>;
