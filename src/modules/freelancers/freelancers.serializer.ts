import { FastifyReply, FastifyRequest } from 'fastify';
import { GetFreelancersQuery } from './freelancers.model';
import { FreelancerComplete } from './freelancers.repository';

export const getFreelancersByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown
) => {
  const freelancer = payload as FreelancerComplete;

  return {
    id: freelancer?.id,
    uuid: freelancer?.uuid,
    description: freelancer.description,
    workMode: freelancer.workMode,
    link: freelancer.link,
    areas: freelancer.areas,
    contractMode: freelancer.contractMode,
    actualRole: freelancer.actualRole,
    city: freelancer.city,
    state: freelancer.state,
    extra: freelancer.extra,
    salary: freelancer.salary,
    tags: freelancer.tags,
    seniority: freelancer.seniority,
    travel: freelancer.travel,
    categories: freelancer.categories,
    createdById: freelancer.createdById,
    updatedById: freelancer.updatedById,
    createdBy: freelancer.createdById,
    updatedBy: freelancer.updatedById,
  };
};

type GetFreelancersRequest = FastifyRequest<{
  Querystring: GetFreelancersQuery;
}>;
export const insertPagination = async (
  request: GetFreelancersRequest,
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

export const getFreelancer = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any
) => {
  const { data, ...rest } = payload;

  const array: FreelancerComplete[] = data;

  const newPayload = array.map(freelancer => ({
    id: freelancer.id,
    uuid: freelancer?.uuid,
    description: freelancer.description,
    workMode: freelancer.workMode,
    link: freelancer.link,
    areas: freelancer.areas,
    contractMode: freelancer.contractMode,
    actualRole: freelancer.actualRole,
    city: freelancer.city,
    state: freelancer.state,
    extra: freelancer.extra,
    salary: freelancer.salary,
    tags: freelancer.tags,
    seniority: freelancer.seniority,
    travel: freelancer.travel,
    categories: freelancer.categories,
    createdById: freelancer.createdById,
    updatedById: freelancer.updatedById,
    createdBy: freelancer.createdById,
    updatedBy: freelancer.updatedById,
  }));

  return {
    ...rest,
    freelancers: newPayload,
  };
};

export const getFreelancers = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any
) => {
  const { data, ...rest } = payload;

  // const array: FreelancerComplete[] = data;

  const newPayload = {
    id: data.id,
    uuid: data?.uuid,
    description: data.description,
    avatar: data.avatar,
    banner: data.banner,
    workMode: data.workMode,
    link: data.link,
    areas: data.areas,
    contractMode: data.contractMode,
    actualRole: data.actualRole,
    city: data.city,
    state: data.state,
    extra: data.extra,
    salary: data.salary,
    tags: data.tags,
    seniority: data.seniority,
    travel: data.travel,
    categories: data.categories,
    createdById: data.createdById,
    updatedById: data.updatedById,
    createdBy: data.createdById,
    updatedBy: data.updatedById,
  };

  return {
    ...rest,
    ...newPayload,
  };
};
