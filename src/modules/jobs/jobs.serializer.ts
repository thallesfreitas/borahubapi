import { FastifyReply, FastifyRequest } from 'fastify';
import { GetJobsQuery } from './jobs.model';
import { JobComplete } from './jobs.repository';

type GetJobsRequest = FastifyRequest<{
  Querystring: GetJobsQuery;
}>;

export const insertPagination = async (
  request: GetJobsRequest,
  reply: FastifyReply,
  payload: any
) => {
  const { count, data } = payload;
  const { skip, limit } = request.query;

  const createUrl = (offset: number, take: number) => {
    const url = new URL(`http://${request.headers.host}${request.url}`);
    url.searchParams.set('skip', offset.toString());
    url.searchParams.set('limit', take.toString());
    return url.toString();
  };

  const moduleCountByLimit = count % limit;

  const lastSkip =
    moduleCountByLimit === 0
      ? count - request.query.limit
      : count - moduleCountByLimit;

  const isLastPage = skip + limit >= count;
  const isFirstPage = skip === 0;

  const links = {
    self: createUrl(skip, limit),
    first: createUrl(0, limit),
    last: createUrl(lastSkip, limit),
    prev: isFirstPage ? null : createUrl(skip - limit, limit),
    next: isLastPage ? null : createUrl(skip + limit, limit),
  };

  return {
    pagination: {
      skip: request.query.skip,
      limit: request.query.limit,
      total: count ?? 0,
    },
    links,
    data,
  };
};

export const getJobs = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any
) => {
  const { data, ...rest } = payload;
  const array: JobComplete[] = data;

  const newPayload = array.map(jobs => ({
    id: jobs.id,
    title: jobs.title,
    slug: jobs.slug,
    description: jobs.description,
    descriptionCompany: jobs.descriptionCompany,
    modelOfWork: jobs.modelOfWork,
    city: jobs.city,
    state: jobs.state,
    showSalary: jobs.showSalary,
    salary: jobs.salary,
    experience: jobs.experience,
    categories: jobs.categories,
    affirmative: jobs.affirmative,
    areas: jobs.areas,
    tags: jobs.tags,
    extra: jobs.extra,
    createdAt: jobs.createdAt,
    updatedAt: jobs.updatedAt,
    company: jobs.company,
    phone: jobs.phone,
    isActive: jobs.isActive,
    email: jobs.email,
    jobApplication: jobs.jobApplication,
    createdBy: jobs.createdById,
    updatedBy: jobs.updatedById,
  }));

  return {
    ...rest,
    jobs: newPayload,
  };
};

export const getJob = async (
  request: FastifyRequest,
  reply: FastifyReply,
  sourcePayload: any
) => {
  const jobs = sourcePayload as JobComplete;

  const newPayload = {
    id: jobs.id,
    title: jobs.title,
    description: jobs.description,
    descriptionCompany: jobs.descriptionCompany,
    modelOfWork: jobs.modelOfWork,
    city: jobs.city,
    state: jobs.state,
    showSalary: jobs.showSalary,
    salary: jobs.salary,
    experience: jobs.experience,
    tags: jobs.tags,
    categories: jobs.categories,
    affirmative: jobs.affirmative,
    jobApplication: jobs.jobApplication,
    areas: jobs.areas,
    extra: jobs.extra,
    phone: jobs.phone,
    email: jobs.email,
    company: jobs.company,
    slug: jobs.slug,
    isActive: jobs.isActive,
    createdAt: jobs.createdAt,
    updatedAt: jobs.updatedAt,
    createdBy: jobs.createdById,
    updatedBy: jobs.updatedById,
  };

  return newPayload;
};
