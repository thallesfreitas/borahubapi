import { FastifyRequest } from 'fastify';

export type UserFilters = {
  email?: string;
  slug: string;
};

export type UserQuery = {
  isActive: string;
  limit: string;
  userID?: number;
};

export type UserParams = {
  Params: UserFilters;
  Query: UserQuery;
};

export type GetUserByEmail = FastifyRequest<UserParams>;
export type GetUserBySlug = FastifyRequest<UserParams>;

export type UserIdFilters = {
  id: number;
};

export type UserIdParams = {
  Params: UserIdFilters;
};

export type GetUserById = FastifyRequest<UserIdParams>;

export type User = {
  name: string;
  email: string;
  phone: string;
  indicatedBy: string;
  password: string;
  optin: boolean;
};

export type UserUpdate = {
  id: number;
  name: string;
  email: string;
  phone: string;
  slug: string;
  password: string;
  optin: boolean;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  isCandidate: boolean;
  isRecruiter: boolean;
  isServiceProvider: boolean;
  isFreelancer: boolean;
};

export type UserBody = {
  Body: User;
};
export type CreateUser = FastifyRequest<UserBody>;

export type UserUpdateBody = {
  Body: UserUpdate;
};

export type UpdateUser = FastifyRequest<UserUpdateBody>;
