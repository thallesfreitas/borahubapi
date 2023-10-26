import { FastifyRequest } from 'fastify';

export type GetCandidatesQuery = {
  limit: number;
  skip: number;
};

export type GetCandidatesRequest = FastifyRequest<{
  Querystring: GetCandidatesQuery;
}>;

export type CandidateFilters = {
  email: string;
  slug: string;
};

export type CandidateParams = {
  Params: CandidateFilters;
};

export type GetCandidateByEmail = FastifyRequest<CandidateParams>;
export type GetCandidateBySlug = FastifyRequest<CandidateParams>;

export type CandidateIdFilters = {
  id: number;
};

export type CandidateIdParams = {
  Params: CandidateIdFilters;
};

export type GetCandidateById = FastifyRequest<CandidateIdParams>;

export type GetCandidatesByUserQuery = {
  limit: number;
  skip: number;
  userId: number;
};
export type GetCandidateByUserQuery = {
  userId: number;
};

export type GetJobsByUserRequest = FastifyRequest<{
  Querystring: GetCandidateByUserQuery;
}>;

export type Candidate = {
  name: string;
  email: string;
  phone: string;
  indicatedBy: string;
  password: string;
  optin: boolean;
};

export type CandidateUpdate = {
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
  affirmative: string[];
  categories: string[];
  tags: string[];
  seniority: string[];
  travel: string[];
};

export type CandidateBody = {
  Body: Candidate;
};

export type CandidateUpdateBody = {
  Body: CandidateUpdate;
};

// export type CreateCandidate = FastifyRequest<CandidateBody>;
export type UpdateCandidate = FastifyRequest<CandidateUpdateBody>;
