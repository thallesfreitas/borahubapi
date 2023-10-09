import { FastifyRequest } from 'fastify';

export type JobBody = {
  title: string;
  slug: string;
  description: string;
  descriptionCompany: string;
  modelOfWork: string;
  city: string;
  state: string;
  salary: string[];
  categories: string[];
  areas: string[];
  tags: string[];
  extra: string;
  userId: number;
  company: string;
  experience: string;
  phone: string;
  email: string;
  isPublished: boolean;
};

export type CreateJobRequest = FastifyRequest<{
  Body: JobBody;
}>;

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
  Body: JobBody;
}>;

export type DeleteJobRequest = FastifyRequest<{
  Params: {
    id: number;
  };
}>;
