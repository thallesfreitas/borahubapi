import {
  Candidate,
  Freelancer,
  JobApplication,
  ServiceProvider,
} from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
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
  data: UserComplete | JobComplete;
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
        if (item.id === payloadType.userID) jobApplied = true;
        return false;
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
  console.log('getBySlugApplication');
  console.log('payload');
  console.log(payload);
  const payloadType = payload as PayloadType;
  let response;
  let data;

  switch (payloadType.type) {
    case 'user':
      data = payloadType.data as UserComplete;
      console.log('data user');
      console.log(data);
      console.log(data?.createdJobApplication);
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
        teste: '3',
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
