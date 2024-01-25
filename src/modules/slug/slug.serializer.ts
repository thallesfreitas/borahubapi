/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable no-case-declarations */
import {
  Candidate,
  Freelancer,
  JobApplication,
  ServiceProvider,
} from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ArticleComplete } from '../articles/articles.repository';
import { JobComplete } from '../jobs/jobs.repository';
import { User } from '../users/user.repository';

interface UserComplete extends User {
  createdJobApplication: JobApplication;
  candidate: Candidate;
  serviceProvider: ServiceProvider;
  freelancer: Freelancer;
}

interface PayloadGenerate {
  slug: string;
}

interface PayloadType extends User {
  type: string;
  data: UserComplete | JobComplete | ArticleComplete;
  userID?: number;
}

export const generateSlug = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown
) => {
  const payloadSlug = payload as PayloadGenerate;
  const response = {
    slug: payloadSlug.slug,
  };
  return response;
};
export const getBySlug = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown
) => {
  const payloadType = payload as PayloadType;
  let response;
  let data;
  console.log('payloadType');
  console.log(payloadType);
  switch (payloadType.type) {
    case 'user':
      data = payloadType.data as UserComplete;
      response = {
        type: payloadType.type,
        id: data?.id,
        // stripe_id: data?.stripe_id,
        optin: data?.optin,
        email: data?.email,
        name: data?.name,
        phone: data?.phone,
        slug: data?.slug,
        isActive: data?.isActive,
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt,
        teste: '1',
        candidate: data?.candidate,
        serviceProvider: data?.serviceProvider,
        freelancer: data?.freelancer,
      };
      break;
    case 'job':
      data = payloadType.data as JobComplete;

      const owner = payloadType.userID === data.updatedById?.id;
      let jobApplied = false;

      data.jobApplication?.map((item: any) => {
        if (item.createdBy === payloadType.userID) jobApplied = true;
      });
      response = {
        type: payloadType.type,
        id: data.id,
        title: data.title,
        description: data.description,
        descriptionCompany: data.descriptionCompany,
        modelOfWork: data.modelOfWork,
        city: data.city,
        state: data.state,
        showSalary: data.showSalary,
        salary: data.salary,
        tags: data.tags,
        affirmative: data.affirmative,
        travel: data.travel,
        contractMode: data.contractMode,
        seniority: data.seniority,
        categories: data.categories,

        jobApplication: data.jobApplication,
        areas: data.areas,
        extra: data.extra,
        phone: data.phone,
        email: data.email,
        isActive: data?.isActive,
        company: data.company,
        slug: data.slug,
        avatar: data.avatar,
        banner: data.banner,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        createdBy: data.createdById,
        updatedBy: data.updatedById,
        owner,
        jobApplied,
      };
      break;
    case 'article':
      const article = payloadType.data as any;
      response = {
        type: payloadType.type,
        id: article.id,
        uuid: article.uuid,
        slug: article.slug,
        title: article.title,
        text: article.text,
        categories: article.categories,
        tags: article.tags,
        isPublished: article.isPublished,
        articleHistory: article.articleHistory,
        articleView: article.articleView,
        articleLike: article.articleLike,
        articleComments: article.articleComments,
        userPaid: article.userPaid,
        price: article.price,
        paid: article.paid,
        viewsCount: article.viewsCount ? article.viewsCount.toString() : 0,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        createdBy: article.createdById,
        updatedBy: article.updatedById,
      };
      break;

    default:
      break;
  }
  return response;
};
export const getBySlugApplication = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown
) => {
  const payloadType = payload as PayloadType;
  let response;
  let data;

  switch (payloadType.type) {
    case 'user':
      data = payloadType.data as UserComplete;
      response = {
        type: payloadType.type,
        createdJobApplication: data?.createdJobApplication,
        id: data?.id,
        // stripe_id: data?.stripe_id,
        optin: data?.optin,
        email: data?.email,
        name: data?.name,
        phone: data?.phone,
        slug: data?.slug,
        isActive: data?.isActive,
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt,
        candidate: data?.candidate,
        serviceProvider: data?.serviceProvider,
        freelancer: data?.freelancer,
      };
      break;

    default:
      break;
  }

  return response;
};
