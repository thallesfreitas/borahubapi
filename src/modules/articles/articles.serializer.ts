import { FastifyReply, FastifyRequest } from 'fastify';
// import { GetJobsQuery } from './jobs.model';
// import { JobComplete } from './jobs.repository';

type GetArticlesRequest = FastifyRequest<{
  Querystring: {
    limit: number;
    skip: number;
  };
}>;
export const insertPagination = async (
  request: GetArticlesRequest,
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

// export const getJobs = async (
//   request: FastifyRequest,
//   reply: FastifyReply,
//   payload: any
// ) => {
//   const { data, ...rest } = payload;
//   const array: JobComplete[] = data;

//   const newPayload = array.map(jobs => ({
//     id: jobs.id,
//     title: jobs.title,
//     slug: jobs.slug,
//     description: jobs.description,
//     descriptionCompany: jobs.descriptionCompany,
//     modelOfWork: jobs.modelOfWork,
//     city: jobs.city,
//     state: jobs.state,
//     showSalary: jobs.showSalary,
//     salary: jobs.salary,
//     experience: jobs.experience,
//     categories: jobs.categories,
//     affirmative: jobs.affirmative,
//     areas: jobs.areas,
//     tags: jobs.tags,
//     extra: jobs.extra,
//     createdAt: jobs.createdAt,
//     updatedAt: jobs.updatedAt,
//     company: jobs.company,
//     phone: jobs.phone,
//     isActive: jobs.isActive,
//     email: jobs.email,
//     jobApplication: jobs.jobApplication,
//     createdBy: jobs.createdById,
//     updatedBy: jobs.updatedById,
//   }));

//   return {
//     ...rest,
//     jobs: newPayload,
//   };
// };

export const getArticle = async (
  request: FastifyRequest,
  reply: FastifyReply,
  sourcePayload: any
) => {
  const article = sourcePayload as any; // JobComplete;
  console.log('article Serialize');
  console.log(article);
  // console.log(request);

  const newPayload = {
    id: article.id,
    uuid: article.uuid,
    slug: article.slug,
    title: article.title,
    text: article.text,
    categories: article.categories,
    tags: article.tags,
    isPublished: article.isPublished,
    articleHistory: article.articleHistory,
    articleView: article.articleView,
    articleLike: article.articleLike,
    articleComments: article.articleComments,
    viewsCount: article.viewsCount.toString(),
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    createdBy: article.createdById,
    updatedBy: article.updatedById,
  };

  return newPayload;
};
