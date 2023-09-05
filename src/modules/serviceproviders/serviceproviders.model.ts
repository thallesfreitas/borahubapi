import { FastifyRequest } from 'fastify';

export type GetServiceProvidersQuery = {
  limit: number;
  skip: number;
};

export type GetServiceProvidersRequest = FastifyRequest<{
  Querystring: GetServiceProvidersQuery;
}>;

export type ServiceProviderFilters = {
  email: string;
  slug: string;
};

export type ServiceProviderParams = {
  Params: ServiceProviderFilters;
};

export type GetServiceProviderByEmail = FastifyRequest<ServiceProviderParams>;
export type GetServiceProviderBySlug = FastifyRequest<ServiceProviderParams>;

export type ServiceProviderIdFilters = {
  id: number;
};

export type ServiceProviderIdParams = {
  Params: ServiceProviderIdFilters;
};

export type GetServiceProviderById = FastifyRequest<ServiceProviderIdParams>;

export type GetServiceProvidersByUserQuery = {
  limit: number;
  skip: number;
  userId: number;
};
export type GetServiceProviderByUserQuery = {
  userId: number;
};

export type GetJobsByUserRequest = FastifyRequest<{
  Querystring: GetServiceProviderByUserQuery;
}>;

export type ServiceProvider = {
  name: string;
  email: string;
  phone: string;
  indicatedBy: string;
  password: string;
  optin: boolean;
};

export type ServiceProviderUpdate = {
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

export type ServiceProviderBody = {
  Body: ServiceProvider;
};

export type ServiceProviderUpdateBody = {
  Body: ServiceProviderUpdate;
};

// export type CreateServiceProvider = FastifyRequest<ServiceProviderBody>;
export type UpdateServiceProvider = FastifyRequest<ServiceProviderUpdateBody>;
