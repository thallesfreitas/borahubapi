// export type SearchType = {
//   filter: string;
//   keyword: string;
//   limit: number;
//   skip: number;
//   isActive?: boolean;
// };

import { FastifyRequest } from 'fastify';

// export type SearchParams = {
//   Params: SearchType;
// };
// export type SearchModel = FastifyRequest<SearchParams>;

export type SearchQuery = {
  count?: number;
  limit: number;
  skip: number;
  filter?: string;
  keyword?: string;
  tag?: string;
  category?: string;
  area?: string;
  isActive?: boolean;
};
export type SearchRequest = FastifyRequest<{
  Querystring: SearchQuery;
}>;
// export type SearchQuery = {
//   limit: number;
//   skip: number;
//   filter?: string;
//   keyword?: string;
//   isActive?: boolean;
// };

// export type SearchRequestModel = FastifyRequest<{
//   Querystring: SearchQuery;
// }>;
