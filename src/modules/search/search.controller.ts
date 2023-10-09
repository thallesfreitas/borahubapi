/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/naming-convention */
import { FastifyReply } from 'fastify';

import * as Model from './search.model';
import * as SearchService from './search.service';

export const search = async (req: Model.SearchRequest, reply: FastifyReply) => {
  const {
    filter,
    keyword,
    limit,
    skip,
    isActive = true,
    tag,
    category,
    area,
  } = req.query;

  const searchResult = await SearchService.search({
    limit: limit as number,
    skip: skip as number,
    filter,
    keyword,
    tag,
    category,
    area,
    isActive,
  });
  console.log('searchResult.jobs.length');
  console.log('searchResult.jobs.length');
  console.log('searchResult.jobs.length');
  console.log('searchResult.jobs.length');
  console.log(searchResult.jobs.length);
  return reply.send({ data: searchResult });
};
