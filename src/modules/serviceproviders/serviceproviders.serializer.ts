import { FastifyReply, FastifyRequest } from 'fastify';
import { GetServiceProvidersQuery } from './serviceproviders.model';
import { ServiceProviderComplete } from './serviceproviders.repository';

export const getServiceProviderByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown
) => {
  const serviceProvider = payload as ServiceProviderComplete;

  return {
    id: serviceProvider?.id,
    uuid: serviceProvider?.uuid,
    description: serviceProvider.description,
    workMode: serviceProvider.workMode,
    link: serviceProvider.link,
    areas: serviceProvider.areas,
    contractMode: serviceProvider.contractMode,
    actualRole: serviceProvider.actualRole,
    city: serviceProvider.city,
    state: serviceProvider.state,
    extra: serviceProvider.extra,
    salary: serviceProvider.salary,
    tags: serviceProvider.tags,
    seniority: serviceProvider.seniority,
    travel: serviceProvider.travel,
    categories: serviceProvider.categories,
    createdById: serviceProvider.createdById,
    updatedById: serviceProvider.updatedById,
    createdBy: serviceProvider.createdById,
    updatedBy: serviceProvider.updatedById,
  };
};

type GetServiceProvidersRequest = FastifyRequest<{
  Querystring: GetServiceProvidersQuery;
}>;
export const insertPagination = async (
  request: GetServiceProvidersRequest,
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

export const getServiceProviders = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any
) => {
  const { data, ...rest } = payload;

  const array: ServiceProviderComplete[] = data;

  const newPayload = array.map(serviceProvider => ({
    id: serviceProvider.id,
    uuid: serviceProvider?.uuid,
    description: serviceProvider.description,
    workMode: serviceProvider.workMode,
    link: serviceProvider.link,
    areas: serviceProvider.areas,
    contractMode: serviceProvider.contractMode,
    actualRole: serviceProvider.actualRole,
    city: serviceProvider.city,
    state: serviceProvider.state,
    extra: serviceProvider.extra,
    salary: serviceProvider.salary,
    tags: serviceProvider.tags,
    seniority: serviceProvider.seniority,
    travel: serviceProvider.travel,
    categories: serviceProvider.categories,
    createdById: serviceProvider.createdById,
    updatedById: serviceProvider.updatedById,
    createdBy: serviceProvider.createdById,
    updatedBy: serviceProvider.updatedById,
  }));

  return {
    ...rest,
    serviceProviders: newPayload,
  };
};

export const getServiceProvider = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any
) => {
  const { data, ...rest } = payload;

  // const array: ServiceProviderComplete[] = data;

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
