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
  RepositoryArticleGetPriceAndAuthor,
  RepositoryCreateArticle,
  RepositoryCreateCommentArticle,
  RepositoryCreateLikeArticle,
  RepositoryDeleteCommentArticle,
  RepositoryDeleteLikeArticle,
  RepositoryGetArticle,
  RepositoryGetFeed,
  RepositoryGetUserPaidArticle,
  RepositorySetUserPaidArticle,
  RepositoryUpdateArticle,
  RepositoryUpdateCommentArticle,
  RepositoryUpdateLikeArticle,
} from './articles.repository';

export const ServiceCreateArticle = (params: ModelCreateArticleBody) =>
  RepositoryCreateArticle(params);

export const ServiceUpdateArticle = (params: ModelUpdateArticleBody) =>
  RepositoryUpdateArticle(params);
export const ServiceArticleGetPriceAndAuthor = async (id: number) => {
  const { amountCostArticle, authorArticle } =
    await RepositoryArticleGetPriceAndAuthor(id);

  return {
    amountCostArticle: amountCostArticle,
    authorArticle: authorArticle,
  };
};

export const ServiceSetUserPaidArticle = (userId: number, articleId: number) =>
  RepositorySetUserPaidArticle(userId, articleId);

export const ServiceGetUserPaidArticle = (userId: number, articleId: number) =>
  RepositoryGetUserPaidArticle(userId, articleId);

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

export const ServiceGetFeed = (params: GetFeedQuery) =>
  RepositoryGetFeed(params);
