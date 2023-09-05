import { FastifyRequest } from 'fastify';

export type GetFreelancersQuery = {
  limit: number;
  skip: number;
};

export type GetFreelancersRequest = FastifyRequest<{
  Querystring: GetFreelancersQuery;
}>;

export type FreelancerFilters = {
  email: string;
  slug: string;
};

export type FreelancerParams = {
  Params: FreelancerFilters;
};

export type GetFreelancerByEmail = FastifyRequest<FreelancerParams>;
export type GetFreelancerBySlug = FastifyRequest<FreelancerParams>;

export type FreelancerIdFilters = {
  id: number;
};

export type FreelancerIdParams = {
  Params: FreelancerIdFilters;
};

export type GetFreelancerById = FastifyRequest<FreelancerIdParams>;

export type GetFreelancersByUserQuery = {
  limit: number;
  skip: number;
  userId: number;
};
export type GetFreelancerByUserQuery = {
  userId: number;
};

export type GetJobsByUserRequest = FastifyRequest<{
  Querystring: GetFreelancerByUserQuery;
}>;

export type Freelancer = {
  name: string;
  email: string;
  phone: string;
  indicatedBy: string;
  password: string;
  optin: boolean;
};

export type FreelancerUpdate = {
  userId: number;
  description: string;
  avatar: string;
  banner: string;
  link: string;
  salary: string[];
  areas: string[];
  city: string;
  contractMode: string[];
  state: string;
  extra: string;
  workMode: string[];
  actualRole: string;
  categories: string[];
  tags: string[];
  seniority: string[];
  travel: string[];
};

export type FreelancerBody = {
  Body: Freelancer;
};

export type FreelancerUpdateBody = {
  Body: FreelancerUpdate;
};

// export type CreateFreelancer = FastifyRequest<FreelancerBody>;
export type UpdateFreelancer = FastifyRequest<FreelancerUpdateBody>;
