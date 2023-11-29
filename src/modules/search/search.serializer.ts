import { FastifyReply, FastifyRequest } from 'fastify';
// import { SearchQuery } from './search.model';
import * as Model from './search.model';
import { SearchReturn } from './search.repository';

type SearchRequestModel = FastifyRequest<{
  Querystring: Model.SearchQuery;
}>;

export const insertPagination = async (
  request: SearchRequestModel,
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

export const getSearch = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any
) => {
  const { data, ...rest } = payload;
  const array: SearchReturn = data;

  const jobPayload = array.jobs.map(jobs => ({
    id: jobs.id,
    avatar: jobs.avatar,
    title: jobs.title,
    slug: jobs.slug,
    description: jobs.description,
    descriptionCompany: jobs.descriptionCompany,
    modelOfWork: jobs.modelOfWork,
    city: jobs.city,
    state: jobs.state,
    salary: jobs.salary,
    experience: jobs.experience,
    affirmative: jobs.affirmative,
    travel: jobs.travel,
    contractMode: jobs.contractMode,
    seniority: jobs.seniority,
    tags: jobs.tags,
    extra: jobs.extra,
    createdAt: jobs.createdAt,
    updatedAt: jobs.updatedAt,
    company: jobs.company,
    phone: jobs.phone,
    isActive: jobs.isActive,
    email: jobs.email,
    createdBy: jobs.createdById.name,
  }));

  const candidatesPayload = array.candidates.map(candidates => ({
    id: candidates.id,
    name: candidates.name,
    slug: candidates.slug,
    description: candidates.candidate?.description,
    avatar: candidates.candidate?.avatar,
    banner: candidates.candidate?.banner,
    link: candidates.candidate?.link,
    salary: candidates.candidate?.salary,
    affirmative: candidates.candidate?.affirmative,
    contractMode: candidates.candidate?.contractMode,
    actualRole: candidates.candidate?.actualRole,
    categories: candidates.candidate.categories,
    tags: candidates.candidate?.tags,
    areas: candidates.candidate?.areas,
    city: candidates.candidate?.city,
    state: candidates.candidate?.state,
    extra: candidates.candidate?.extra,
    workMode: candidates.candidate?.workMode,
    seniority: candidates.candidate?.seniority,
    travel: candidates.candidate?.travel,
    createdAt: candidates.candidate?.createdAt,
    updatedAt: candidates.candidate?.updatedAt,
  }));

  const serviceProviderPayload = array.serviceProvider.map(serviceProvider => ({
    id: serviceProvider.id,
    name: serviceProvider.name,
    slug: serviceProvider.slug,
    description: serviceProvider.serviceProvider?.description,
    avatar: serviceProvider.serviceProvider?.avatar,
    banner: serviceProvider.serviceProvider?.banner,
    link: serviceProvider.serviceProvider?.link,
    salary: serviceProvider.serviceProvider?.salary,
    contractMode: serviceProvider.serviceProvider?.contractMode,
    actualRole: serviceProvider.serviceProvider?.actualRole,
    categories: serviceProvider.serviceProvider?.categories,
    tags: serviceProvider.serviceProvider?.tags,
    areas: serviceProvider.serviceProvider?.areas,
    city: serviceProvider.serviceProvider?.city,
    state: serviceProvider.serviceProvider?.state,
    extra: serviceProvider.serviceProvider?.extra,
    workMode: serviceProvider.serviceProvider?.workMode,
    seniority: serviceProvider.serviceProvider?.seniority,
    travel: serviceProvider.serviceProvider?.travel,
    createdAt: serviceProvider.serviceProvider?.createdAt,
    updatedAt: serviceProvider.serviceProvider?.updatedAt,
  }));

  const freelancerPayload = array.freelancer.map(freelancer => ({
    id: freelancer.id,
    name: freelancer.name,
    slug: freelancer.slug,
    description: freelancer.freelancer?.description,
    avatar: freelancer.freelancer?.avatar,
    banner: freelancer.freelancer?.banner,
    link: freelancer.freelancer?.link,
    salary: freelancer.freelancer?.salary,
    contractMode: freelancer.freelancer?.contractMode,
    actualRole: freelancer.freelancer?.actualRole,
    categories: freelancer.freelancer?.categories,
    tags: freelancer.freelancer?.tags,
    areas: freelancer.freelancer?.areas,
    city: freelancer.freelancer?.city,
    state: freelancer.freelancer?.state,
    extra: freelancer.freelancer?.extra,
    workMode: freelancer.freelancer?.workMode,
    seniority: freelancer.freelancer?.seniority,
    travel: freelancer.freelancer?.travel,
    createdAt: freelancer.freelancer?.createdAt,
    updatedAt: freelancer.freelancer?.updatedAt,
  }));

  return {
    ...rest,
    result: {
      jobs: jobPayload,
      candidates: candidatesPayload,
      serviceProvider: serviceProviderPayload,
      freelancer: freelancerPayload,
    },
    // payload,
  };
};
