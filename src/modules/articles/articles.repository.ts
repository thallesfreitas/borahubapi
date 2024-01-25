/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
import {
  ArticleComments,
  ArticleHistory,
  ArticleLike,
  ArticleView,
  Articles,
  Category,
  Prisma,
  Tags,
  User,
} from '@prisma/client';
import { DateTime } from 'aws-sdk/clients/devicefarm';
import dbClient from '../../lib/dbClient';
import { updateTagsOnArticles } from '../tags/tags.service';

import { updateCategoryOnArticles } from '../category/category.service';
// eslint-disable-next-line import/no-cycle
// import * as SlugService from '../slug/slug.service';
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

export const RepositoryCreateArticle = async (data: ModelCreateArticleBody) => {
  console.log(data);
  try {
    // const slug = await SlugService.generate(`${rest.title}`);
    const newUserId = data.userId;
    delete data.userId;
    const articleCreate: Prisma.ArticlesUncheckedCreateInput = {
      ...data,
      createdBy: newUserId,
      updatedBy: newUserId,
      categories: {},
      tags: {},
    };

    delete articleCreate.id;
    delete articleCreate.categories;
    delete articleCreate.tags;

    const article = await dbClient.articles.create({
      data: articleCreate,
    });

    updateCategoryOnArticles({
      data: data.categories,
      articleId: article.id,
    });

    updateTagsOnArticles({
      data: data.tags,
      articleId: article.id,
    });

    return article;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log(error);
        throw new Error('A new article cannot be created');
      }
    }
    throw error;
  }
};

export const RepositoryArticleGetPriceAndAuthor = async (id: number) => {
  const article = await dbClient.articles.findUnique({
    where: { id },
  });
  const amountCostArticle = !article ? 0 : article.price;
  const authorArticle = !article ? 0 : article.createdBy;
  return {
    amountCostArticle: amountCostArticle,
    authorArticle: authorArticle,
  };
};
export const RepositoryUpdateArticle = async (data: ModelUpdateArticleBody) => {
  try {
    const saveHistory = data.save;
    delete data.save;
    const currentArticle = await dbClient.articles.findUnique({
      where: { id: data.id },
      select: {
        id: true,
        slug: true,
        title: true,
        text: true,
        createdBy: true,
        paid: true,
        price: true,
      },
    });
    if (!currentArticle) return false;

    const articleHistoryContent: Prisma.ArticleHistoryUncheckedCreateInput = {
      slug: currentArticle.slug,
      title: currentArticle.title,
      text: currentArticle.text as object,
      articleId: currentArticle.id,
      // categories: {},
      // tags: {},
    };
    const articleUpdate: Prisma.ArticlesUncheckedCreateInput = {
      ...data,
      categories: {},
      tags: {},
    };

    delete articleUpdate.id;
    delete articleUpdate.categories;
    delete articleUpdate.tags;
    if (saveHistory) {
      const newArticle = await dbClient.articleHistory.create({
        data: { ...articleHistoryContent },
      });
    }

    const update = await dbClient.articles.update({
      where: { id: currentArticle.id },
      data: articleUpdate,
    });

    updateCategoryOnArticles({
      data: data.categories,
      articleId: currentArticle.id,
    });

    updateTagsOnArticles({
      data: data.tags,
      articleId: currentArticle.id,
    });
    // update.viewsCount = update.viewsCount.toString();
    return await RepositoryGetArticle({
      slug: update.slug,
      userId: currentArticle.createdBy as number,
      isPublished: update.isPublished,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A article cannot be updated');
      }
    }
    throw error;
  }
};

export const RepositoryCreateCommentArticle = async (
  data: ModelCreateCommentArticleBody
) => {
  try {
    const article = await dbClient.articles.findUnique({
      where: { slug: data.slug },
    });
    if (article) {
      const comment = await dbClient.articleComments.create({
        data: {
          articleId: article.id,
          createdBy: data.userId,
          comment: data.comment,
        },
      });

      return comment;
    }
    return false;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A new comment cannot be created');
      }
    }
    throw error;
  }
};

export const RepositoryUpdateCommentArticle = async (
  data: ModelUpdateCommentArticleBody
) => {
  try {
    const comment = await dbClient.articleComments.findUnique({
      where: { id: data.id },
    });
    if (comment) {
      const commentUpdate = await dbClient.articleComments.update({
        where: { id: data.id },
        data: {
          id: comment.id,
          comment: data.comment,
        },
      });

      return commentUpdate;
    }
    return false;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A comment cannot be update');
      }
    }
    throw error;
  }
};
export const RepositoryDeleteCommentArticle = async (
  data: ModelDeleteCommentArticleBody
) => {
  try {
    const comment = await dbClient.articleComments.delete({
      where: {
        id: data.id,
      },
    });

    return comment;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('This comment cannot be delete');
      }
    }
    throw error;
  }
};

export const RepositoryCreateLikeArticle = async (
  data: ModelCreateLikeArticleBody
) => {
  try {
    const article = await dbClient.articles.findUnique({
      where: { slug: data.slug },
    });
    if (article) {
      const likeExisting = await dbClient.articleLike.findUnique({
        where: {
          id: article.id,
          createdBy: data.userId,
          type: data.type,
        },
      });

      if (likeExisting) {
        return await RepositoryDeleteLikeArticle({ id: likeExisting.id });
      }

      const like = await dbClient.articleLike.create({
        data: {
          articleId: article.id,
          createdBy: data.userId,
          type: data.type,
        },
      });

      return like;
    }
    return false;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A new like cannot be created');
      }
    }
    throw error;
  }
};
export const RepositoryUpdateLikeArticle = async (
  data: ModelUpdateLikeArticleBody
) => {
  try {
    const like = await dbClient.articleLike.update({
      where: {
        id: data.id,
      },
      data: {
        type: data.type,
      },
    });

    return like;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A new comment cannot be created');
      }
    }
    throw error;
  }
};

export const RepositoryDeleteLikeArticle = async (
  data: ModelDeleteLikeArticleBody
) => {
  try {
    const like = await dbClient.articleLike.delete({
      where: {
        id: data.id,
      },
    });

    return like;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('This like cannot be delete');
      }
    }
    throw error;
  }
};

export const RepositorySetUserPaidArticle = async (
  userId: number,
  articleId: number
) => {
  console.log('dbClient.userArticlePaid.create');
  console.log(userId, articleId);
  return await dbClient.userArticlePaid.create({
    data: {
      articleId: articleId,
      createdBy: userId,
    },
  });
};

export const RepositoryGetUserPaidArticle = (
  userId: number,
  articleId: number
) =>
  dbClient.userArticlePaid.findFirst({
    where: {
      articleId: articleId,
      createdBy: userId,
    },
  });

export const RepositoryGetArticle = async (data: GetArticleBySlugParams) => {
  let article = (await dbClient.articles.findUnique({
    where: { slug: data.slug },
  })) as any;
  if (!article) return false;

  if (data.userId) {
    const existingView = await dbClient.articleView.findFirst({
      where: {
        articleId: article.id,
        createdBy: Number(data.userId),
      },
    });
    if (!existingView) {
      await dbClient.articleView.create({
        data: {
          articleId: article.id,
          createdBy: Number(data.userId),
        },
      });
    }
  }
  let userPaid = null;
  console.log('article.paid');
  console.log(article.paid);
  if (article.paid) {
    userPaid = await RepositoryGetUserPaidArticle(
      Number(data.userId),
      article.id
    );
  }
  const incrementValue = data.userId !== article.createdBy ? 1 : 0;
  article = (await dbClient.articles.update({
    where: {
      slug: data.slug,
      // createdById: { id: createdBy },
      deletedAt: null,

      isPublished: data.isPublished,
    },
    data: {
      viewsCount: {
        increment: incrementValue,
      },
    },
    include: {
      articleHistory: {
        select: {
          id: true,
          uuid: true,
          slug: true,
          title: true,
          text: true,
        },
      },
      articleView: {
        select: {
          viewedAt: true,
          createdById: {
            select: {
              id: true,
              uuid: true,
              name: true,
              email: true,
            },
          },
        },
      },
      userArticlePaid: {
        select: {
          id: true,
          paidAt: true,
          createdById: {
            select: {
              id: true,
              uuid: true,
              name: true,
              email: true,
            },
          },
        },
      },
      articleLike: {
        select: {
          id: true,
          type: true,
          viewedAt: true,
          createdById: {
            select: {
              id: true,
              uuid: true,
              name: true,
              email: true,
            },
          },
        },
      },
      articleComments: {
        select: {
          id: true,
          comment: true,
          createdById: {
            select: {
              id: true,
              uuid: true,
              name: true,
              email: true,
            },
          },
        },
      },
      createdById: {
        select: {
          id: true,
          slug: true,
          uuid: true,
          name: true,
          email: true,
        },
      },
      updatedById: {
        select: {
          id: true,
          slug: true,
          uuid: true,
          name: true,
          email: true,
        },
      },
      deletedById: {
        select: {
          id: true,
          slug: true,
          uuid: true,
          name: true,
          email: true,
        },
      },

      categories: {
        select: {
          category: {
            select: {
              type: true,
              name: true,
            },
          },
        },
      },
      tags: {
        select: {
          tags: {
            select: {
              type: true,
              name: true,
            },
          },
        },
      },
    },
  })) as any;
  article.userPaid = userPaid;
  return article;
};

export interface ArticleComplete extends Articles {
  categories: Category;
  tags: Tags;
  createdById: User;
  created_by: User;
  updatedById: User;
  updated_by: User;
  deletedById: User;
  articleHistory: ArticleHistory;
  article_view: ArticleView;
  articleView: ArticleView;
  articleLike: ArticleLike;
  articleComments: ArticleComments;
  createdat: DateTime;
  updatedat: DateTime;
  is_published: boolean;
}
// FEED
export const RepositoryGetFeed = async (data: GetFeedQuery) => {
  const { keyword, limit, skip, tag, category, area, isActive = true } = data;
  const keywordfix = keyword?.split(' ').join(' <-> ');
  const tagfix = tag?.split(' ').join(' | ');
  const categoryfix = category?.split(' ').join(' | ');
  const areafix = area?.split(' ').join(' | ');
  // const article = await dbClient.articles.findMany({
  //   where: {
  //     isPublished: true,
  //   },
  //   include: {
  //     articleView: {
  //       select: {
  //         viewedAt: true,
  //         createdById: {
  //           select: {
  //             id: true,
  //             uuid: true,
  //             name: true,
  //             email: true,
  //           },
  //         },
  //       },
  //     },
  //     articleLike: {
  //       select: {
  //         id: true,
  //         type: true,
  //         viewedAt: true,
  //         createdById: {
  //           select: {
  //             id: true,
  //             uuid: true,
  //             name: true,
  //             email: true,
  //           },
  //         },
  //       },
  //     },
  //     articleComments: {
  //       select: {
  //         id: true,
  //         comment: true,
  //         createdById: {
  //           select: {
  //             id: true,
  //             uuid: true,
  //             name: true,
  //             email: true,
  //           },
  //         },
  //       },
  //     },
  //     createdById: {
  //       select: {
  //         id: true,
  //         uuid: true,
  //         name: true,
  //         email: true,
  //         slug: true,
  //         candidate: {
  //           select: {
  //             avatar: true,
  //           },
  //         },
  //       },
  //     },
  //     updatedById: {
  //       select: {
  //         id: true,
  //         uuid: true,
  //         name: true,
  //         email: true,
  //         slug: true,
  //         candidate: {
  //           select: {
  //             avatar: true,
  //           },
  //         },
  //       },
  //     },
  //     deletedById: {
  //       select: {
  //         id: true,
  //         uuid: true,
  //         name: true,
  //         email: true,
  //         slug: true,
  //         candidate: {
  //           select: {
  //             avatar: true,
  //           },
  //         },
  //       },
  //     },

  //     categories: {
  //       select: {
  //         category: {
  //           select: {
  //             type: true,
  //             name: true,
  //           },
  //         },
  //       },
  //     },
  //     tags: {
  //       select: {
  //         tags: {
  //           select: {
  //             type: true,
  //             name: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   skip: skip || 0,
  //   take: limit || 1,
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  // });

  const article = await dbClient.$queryRaw`
    SELECT
      a.*,
      a.created_at as createdAt,
      COUNT(av.id) AS viewCount,
      COUNT(al.id) AS likeCount,
      COUNT(ac.id) AS commentCount,
      (a.views_count + COUNT(av.id) + COUNT(al.id) + COUNT(ac.id)) / (EXTRACT(DAY FROM (CURRENT_DATE - a.created_at)) + 1) AS relevanceScore,
      json_build_object(
        'id', u.id,
        'name', u.name
      ) as created_by,
      json_agg(
        json_build_object(
          'id', av.id,
          'created_by', av.created_by,
          'created_by_id', json_build_object(
            'id', u.id,
            'name', u.name
          )
        )
      ) as article_view
    FROM
      articles a
    LEFT JOIN
      users u ON a.created_by = u.id
    LEFT JOIN
      article_view av ON a.id = av.article_id
    LEFT JOIN
      article_like al ON a.id = al.article_id
    LEFT JOIN
      article_comments ac ON a.id = ac.article_id
    WHERE
      a.is_published = true
    GROUP BY
      a.id, u.id, av.id
    ORDER BY
      relevanceScore DESC
    LIMIT ${limit} OFFSET ${skip}
  `;
  console.log('+++++++++++');
  console.log('+++++++++++');
  console.log('+++++++++++');
  console.log('+++++++++++');
  console.log('+++++++++++');
  console.log('+++++++++++');
  console.log(article);
  console.log('+++++++++++');
  console.log('+++++++++++');
  console.log('+++++++++++');
  console.log('+++++++++++');
  console.log('+++++++++++');
  console.log('+++++++++++');

  return article;
};
