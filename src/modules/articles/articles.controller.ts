import { FastifyReply } from 'fastify';

import {
  CreateArticleBodyRequest,
  CreateCommentArticleBodyRequest,
  CreateLikeArticleBodyRequest,
  DeleteCommentArticleBodyRequest,
  DeleteLikeArticleBodyRequest,
  GetArticleParamsRequest,
  GetFeedRequest,
  UpdateArticleBodyRequest,
  UpdateCommentArticleBodyRequest,
  UpdateLikeArticleBodyRequest,
} from './articles.model';
import {
  ServiceCreateArticle,
  ServiceCreateCommentArticle,
  ServiceCreateLikeArticle,
  ServiceDeleteCommentArticle,
  ServiceDeleteLikeArticle,
  ServiceGetArticle,
  ServiceGetFeed,
  ServiceUpdateArticle,
  ServiceUpdateCommentArticle,
  ServiceUpdateLikeArticle,
} from './articles.service';

export const ControllerCreateArticle = async (
  request: CreateArticleBodyRequest,
  reply: FastifyReply
) => {
  const jobs = await ServiceCreateArticle(request.body);

  return reply.send(jobs);
};

export const ControllerUpdateArticle = async (
  request: UpdateArticleBodyRequest,
  reply: FastifyReply
) => {
  const article = await ServiceUpdateArticle(request.body);
  return reply.send(article);
};

export const ControllerCreateCommentArticle = async (
  request: CreateCommentArticleBodyRequest,
  reply: FastifyReply
) => {
  const article = await ServiceCreateCommentArticle(request.body);

  return reply.send(article);
};

export const ControllerUpdateCommentArticle = async (
  request: UpdateCommentArticleBodyRequest,
  reply: FastifyReply
) => {
  const jobs = await ServiceUpdateCommentArticle(request.body);

  return reply.send(jobs);
};
export const ControllerDeleteCommentArticle = async (
  request: DeleteCommentArticleBodyRequest,
  reply: FastifyReply
) => {
  const jobs = await ServiceDeleteCommentArticle(request.body);

  return reply.send(jobs);
};
export const ControllerCreateLikeArticle = async (
  request: CreateLikeArticleBodyRequest,
  reply: FastifyReply
) => {
  const jobs = await ServiceCreateLikeArticle(request.body);

  return reply.send(jobs);
};
export const ControllerUpdateLikeArticle = async (
  request: UpdateLikeArticleBodyRequest,
  reply: FastifyReply
) => {
  const jobs = await ServiceUpdateLikeArticle(request.body);

  return reply.send(jobs);
};
export const ControllerDeleteLikeArticle = async (
  request: DeleteLikeArticleBodyRequest,
  reply: FastifyReply
) => {
  const jobs = await ServiceDeleteLikeArticle(request.body);

  return reply.send(jobs);
};
export const ControllerGetArticle = async (
  request: GetArticleParamsRequest,
  reply: FastifyReply
) => {
  const article = await ServiceGetArticle(request.query);
  return reply.send(article);
};

export const ControllerGetFeed = async (
  request: GetFeedRequest,
  reply: FastifyReply
) => {
  const articles = await ServiceGetFeed(request.query);
  return reply.send({ data: articles });
};
