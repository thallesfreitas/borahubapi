import { SearchQuery } from './search.model';
import * as SearchRepository from './search.repository';

export const search = async ({
  filter,
  keyword,
  limit,
  skip,
  isActive,
  tag,
  category,
  area,
}: SearchQuery) =>
  SearchRepository.search({
    limit: limit as number,
    skip: skip as number,
    filter,
    keyword,
    isActive,
    tag,
    category,
    area,
  });
