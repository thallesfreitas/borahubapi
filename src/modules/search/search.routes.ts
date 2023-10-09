import { FastifyInstance } from 'fastify';
import { onSend } from '../../utils/hooks/onSend';
import * as Controller from './search.controller';
import * as Model from './search.model';
import * as Schema from './search.schema';
import * as Serializer from './search.serializer';

export default async (fastify: FastifyInstance) => {
  // fastify.get<{ Params: SearchRequestModel }>(
  //   '/',
  //   {
  //     schema: { params: Schema.searchBody },
  //     preSerialization: [Serializer.insertPagination, Serializer.getSearch],
  //     onSend,
  //   },
  //   Controller.search
  // );

  fastify.get<{ Querystring: Model.SearchQuery }>(
    '/',
    {
      schema: { querystring: Schema.searchBody },
      preSerialization: [Serializer.insertPagination, Serializer.getSearch],
      onSend,
    },
    Controller.search
  );
};
