import { FastifyReply, FastifyRequest } from 'fastify';
import { GetCandidatesQuery } from './candidate.model';
import { CandidateComplete } from './candidate.repository';

export const getCandidateByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown
) => {
  const candidate = payload as CandidateComplete;

  return {
    id: candidate?.id,
    uuid: candidate?.uuid,
    description: candidate.description,
    workMode: candidate.workMode,
    link: candidate.link,
    areas: candidate.areas,
    contractMode: candidate.contractMode,
    actualRole: candidate.actualRole,
    city: candidate.city,
    state: candidate.state,
    extra: candidate.extra,
    salary: candidate.salary,
    tags: candidate.tags,
    seniority: candidate.seniority,
    travel: candidate.travel,
    affirmative: candidate.affirmative,
    categories: candidate.categories,
    createdById: candidate.createdById,
    updatedById: candidate.updatedById,
    createdBy: candidate.createdById,
    updatedBy: candidate.updatedById,
  };
};

type GetCandidatesRequest = FastifyRequest<{
  Querystring: GetCandidatesQuery;
}>;
export const insertPagination = async (
  request: GetCandidatesRequest,
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

export const getCandidates = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any
) => {
  const { data, ...rest } = payload;

  const array: CandidateComplete[] = data;

  const newPayload = array.map(candidate => ({
    id: candidate.id,
    uuid: candidate?.uuid,
    description: candidate.description,
    workMode: candidate.workMode,
    link: candidate.link,
    areas: candidate.areas,
    contractMode: candidate.contractMode,
    actualRole: candidate.actualRole,
    city: candidate.city,
    state: candidate.state,
    extra: candidate.extra,
    salary: candidate.salary,
    tags: candidate.tags,
    seniority: candidate.seniority,
    travel: candidate.travel,
    affirmative: candidate.affirmative,
    categories: candidate.categories,
    createdById: candidate.createdById,
    updatedById: candidate.updatedById,
    createdBy: candidate.createdById,
    updatedBy: candidate.updatedById,
  }));

  return {
    ...rest,
    candidates: newPayload,
  };
};

export const getCandidate = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any
) => {
  const { data, ...rest } = payload;

  // const array: CandidateComplete[] = data;

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
    affirmative: data.affirmative,
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
