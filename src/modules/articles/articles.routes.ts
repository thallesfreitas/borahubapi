import { FastifyInstance } from 'fastify';
import { onSend } from '../../utils/hooks/onSend';
import {
  ControllerCreateArticle,
  ControllerCreateCommentArticle,
  ControllerCreateLikeArticle,
  ControllerDeleteCommentArticle,
  ControllerDeleteLikeArticle,
  ControllerGetArticle,
  ControllerGetFeed,
  ControllerUpdateArticle,
  ControllerUpdateCommentArticle,
  ControllerUpdateLikeArticle,
} from './articles.controller';
import {
  GetArticleBySlugParams,
  GetFeedQuery,
  ModelCreateArticleBody,
  ModelCreateCommentArticleBody,
  ModelCreateLikeArticleBody,
  ModelDeleteCommentArticleBody,
  ModelDeleteLikeArticleBody,
  ModelUpdateArticleBody,
  ModelUpdateCommentArticleBody,
  ModelUpdateLikeArticleBody,
} from './articles.model';
import {
  SchemaCreateArticleBody,
  SchemaCreateCommentArticleBody,
  SchemaCreateLikeArticleBody,
  SchemaDeleteCommentArticleBody,
  SchemaDeleteLikeArticleBody,
  SchemaGetArticleBody,
  SchemaGetFeedBody,
  SchemaUpdateArticleBody,
  SchemaUpdateCommentArticleBody,
  SchemaUpdateLikeArticleBody,
} from './articles.schema';
import * as Serializer from './articles.serializer';

export default async (fastify: FastifyInstance) => {
  //
  fastify.post<{ Body: ModelCreateArticleBody }>(
    '/',
    {
      schema: { body: SchemaCreateArticleBody },
      preSerialization: [Serializer.getArticle],
      onSend,
    },
    ControllerCreateArticle
  );
  //
  //
  fastify.put<{ Body: ModelUpdateArticleBody }>(
    '/',
    {
      schema: { body: SchemaUpdateArticleBody },
      preSerialization: [Serializer.getArticle],
      onSend,
    },
    ControllerUpdateArticle
  );
  //
  fastify.post<{ Body: ModelCreateCommentArticleBody }>(
    '/createComment',
    {
      schema: { body: SchemaCreateCommentArticleBody },
      onSend,
    },
    ControllerCreateCommentArticle
  );
  //
  fastify.post<{ Body: ModelUpdateCommentArticleBody }>(
    '/updateComment',
    {
      schema: { body: SchemaUpdateCommentArticleBody },
      onSend,
    },
    ControllerUpdateCommentArticle
  );
  //
  fastify.post<{ Body: ModelDeleteCommentArticleBody }>(
    '/deleteComment',
    {
      schema: { body: SchemaDeleteCommentArticleBody },
      onSend,
    },
    ControllerDeleteCommentArticle
  );
  //
  fastify.post<{ Body: ModelCreateLikeArticleBody }>(
    '/createLike',
    {
      schema: { body: SchemaCreateLikeArticleBody },
      onSend,
    },
    ControllerCreateLikeArticle
  );
  //
  //
  fastify.post<{ Body: ModelUpdateLikeArticleBody }>(
    '/updateLike',
    {
      schema: { body: SchemaUpdateLikeArticleBody },
      onSend,
    },
    ControllerUpdateLikeArticle
  );
  //
  //
  fastify.post<{ Body: ModelDeleteLikeArticleBody }>(
    '/deleteLike',
    {
      schema: { body: SchemaDeleteLikeArticleBody },
      onSend,
    },
    ControllerDeleteLikeArticle
  );
  //
  fastify.get<{ Querystring: GetArticleBySlugParams }>(
    '/',
    {
      schema: { querystring: SchemaGetArticleBody },
      preSerialization: [Serializer.getArticle],
      onSend,
    },
    ControllerGetArticle
  );
  //
  // fastify.get<{ Querystring: GetArticleBySlugParams }>(
  //   '/',
  //   {
  //     schema: { querystring: SchemaGetArticleBody },
  //     preSerialization: [Serializer.getArticle],
  //     onSend,
  //   },
  //   ControllerGetArticle
  // );
  fastify.get<{ Querystring: GetFeedQuery }>(
    '/feed',
    {
      schema: { querystring: SchemaGetFeedBody },
      preSerialization: [Serializer.insertPagination, Serializer.getFeed],
      onSend,
    },
    ControllerGetFeed
  );
};
