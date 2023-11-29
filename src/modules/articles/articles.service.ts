import {
  GetArticleBySlugParams,
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
  RepositoryCreateArticle,
  RepositoryCreateCommentArticle,
  RepositoryCreateLikeArticle,
  RepositoryDeleteCommentArticle,
  RepositoryDeleteLikeArticle,
  RepositoryGetArticle,
  RepositoryUpdateArticle,
  RepositoryUpdateCommentArticle,
  RepositoryUpdateLikeArticle,
} from './articles.repository';

export const ServiceCreateArticle = (params: ModelCreateArticleBody) =>
  RepositoryCreateArticle(params);

export const ServiceUpdateArticle = (params: ModelUpdateArticleBody) =>
  RepositoryUpdateArticle(params);

export const ServiceCreateCommentArticle = (
  params: ModelCreateCommentArticleBody
) => RepositoryCreateCommentArticle(params);

export const ServiceUpdateCommentArticle = (
  params: ModelUpdateCommentArticleBody
) => RepositoryUpdateCommentArticle(params);

export const ServiceDeleteCommentArticle = (
  params: ModelDeleteCommentArticleBody
) => RepositoryDeleteCommentArticle(params);

export const ServiceCreateLikeArticle = (params: ModelCreateLikeArticleBody) =>
  RepositoryCreateLikeArticle(params);

export const ServiceUpdateLikeArticle = (params: ModelUpdateLikeArticleBody) =>
  RepositoryUpdateLikeArticle(params);

export const ServiceDeleteLikeArticle = (params: ModelDeleteLikeArticleBody) =>
  RepositoryDeleteLikeArticle(params);

export const ServiceGetArticle = (params: GetArticleBySlugParams) =>
  RepositoryGetArticle(params);
