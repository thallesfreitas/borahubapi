import { FastifyRequest } from 'fastify';

export type ModelCreateArticleBody = {
  id?: number;
  userId?: number;
  slug: string;
  title: string;
  text: object;
  categories: string[];
  tags: string[];
  isPublished: boolean;
};

export type CreateArticleBodyRequest = FastifyRequest<{
  Body: ModelCreateArticleBody;
}>;
/// /

export type ModelUpdateArticleBody = {
  save?: boolean;
  id: number;
  slug: string;
  title: string;
  text: object;
  categories: string[];
  tags: string[];
  isPublished: boolean;
};

export type UpdateArticleBodyRequest = FastifyRequest<{
  Body: ModelUpdateArticleBody;
}>;
/// /

export type ModelCreateCommentArticleBody = {
  slug: string;
  userId: number;
  comment: string;
};

export type CreateCommentArticleBodyRequest = FastifyRequest<{
  Body: ModelCreateCommentArticleBody;
}>;
///
export type ModelUpdateCommentArticleBody = {
  id: number;
  comment: string;
};

export type UpdateCommentArticleBodyRequest = FastifyRequest<{
  Body: ModelUpdateCommentArticleBody;
}>;
///

export type ModelDeleteCommentArticleBody = {
  id: number;
};

export type DeleteCommentArticleBodyRequest = FastifyRequest<{
  Body: ModelDeleteCommentArticleBody;
}>;
///
export type ModelCreateLikeArticleBody = {
  slug: string;
  userId: number;
  type: number;
};

export type CreateLikeArticleBodyRequest = FastifyRequest<{
  Body: ModelCreateLikeArticleBody;
}>;
///
///
export type ModelUpdateLikeArticleBody = {
  id: number;
  type: number;
};

export type UpdateLikeArticleBodyRequest = FastifyRequest<{
  Body: ModelUpdateLikeArticleBody;
}>;
///
///
export type ModelDeleteLikeArticleBody = {
  id: number;
};

export type DeleteLikeArticleBodyRequest = FastifyRequest<{
  Body: ModelDeleteLikeArticleBody;
}>;
///
export type GetArticleBySlugParams = {
  slug: string;
  userId?: number;
  skip?: number;
  limit?: number;
  isPublished?: boolean;
};

export type GetArticleParamsRequest = FastifyRequest<{
  Querystring: GetArticleBySlugParams;
}>;
