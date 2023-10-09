import { Candidate, Freelancer, ServiceProvider } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JobComplete } from '../jobs/jobs.repository';
import { User } from '../users/user.repository';

interface UserComplete extends User {
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

      const owner = payloadType.userID == data.updatedById?.id;
      let jobApplied = false;
      if (data.jobApplication.length > 0) {
        jobApplied =
          data.jobApplication.find(app => app.id === payloadType.userID) ===
          undefined;
      }
      response = {
        type: payloadType.type,
        id: data.id,
        title: data.title,
        description: data.description,
        descriptionCompany: data.descriptionCompany,
        modelOfWork: data.modelOfWork,
        city: data.city,
        state: data.state,
        salary: data.salary,
        tags: data.tags,
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
