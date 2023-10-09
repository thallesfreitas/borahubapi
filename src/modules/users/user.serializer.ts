import { Areas, Candidate, Tags } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from './user.repository';

export const getUserByEmail = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown
) => {
  const user = payload as UserWithProfiles;

  return {
    id: user?.id,
    // stripe_id: user?.stripe_id,
    optin: user?.optin,
    email: user?.email,
    name: user?.name,
    phone: user?.phone,
    slug: user?.slug,
    isActive: user?.isActive,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
  };
};

interface UserWithProfiles extends User {
  candidate: Candidate;
  tags: Tags;
  areas: Areas;
}

export const getUserBySlug = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown
) => {
  const user = payload as UserWithProfiles;

  return {
    id: user?.id,
    // stripe_id: user?.stripe_id,
    optin: user?.optin,
    email: user?.email,
    name: user?.name,
    phone: user?.phone,
    slug: user?.slug,
    isActive: user?.isActive,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
    candidate: user?.candidate,
  };
};

export const getUserById = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown
) => {
  const user = payload as UserWithProfiles;

  return {
    id: user?.id,
    uuid: user?.uuid,
    // stripe_id: user?.stripe_id,
    optin: user?.optin,
    email: user?.email,
    name: user?.name,
    phone: user?.phone,
    slug: user?.slug,
    indicatedBy: user?.indicatedBy,
    isActive: user?.isActive,
    isPhoneConfirmed: user?.isPhoneConfirmed,
    isEmailConfirmed: user?.isEmailConfirmed,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
    candidate: user?.candidate,
  };
};
