import { FastifyReply } from 'fastify';
import {
  GetJobsByUserRequest,
  GetServiceProvidersRequest,
  UpdateServiceProvider,
} from './serviceproviders.model';
import * as ServiceProvidersService from './serviceproviders.service';

export const getServiceProviders = async (
  req: GetServiceProvidersRequest,
  reply: FastifyReply
) => {
  const { limit, skip } = req.query;

  const [serviceProvider, serviceProviderCount] = await Promise.all([
    ServiceProvidersService.getServiceProviders(limit, skip),
    ServiceProvidersService.getServiceProvidersCount(),
  ]);
  return reply.send({
    count: serviceProviderCount,
    data: serviceProvider,
  });
};

export const getServiceProviderByUserId = async (
  request: GetJobsByUserRequest,
  reply: FastifyReply
) => {
  const { userId } = request.query;
  const [serviceProvider] = await Promise.all([
    ServiceProvidersService.getServiceProviderByUserId(userId),
  ]);

  return reply.send({
    data: serviceProvider,
  });
};

export const updateServiceProvider = async (
  req: UpdateServiceProvider,
  reply: FastifyReply
) => {
  const {
    userId,
    description,
    avatar,
    banner,
    link,
    salary,
    areas,
    city,
    contractMode,
    state,
    extra,
    workMode,
    actualRole,
    categories,
    tags,
    seniority,
    travel,
  } = req.body;

  const serviceProvider = await ServiceProvidersService.updateServiceProvider(
    Number(userId),
    {
      description,
      avatar,
      banner,
      link,
      salary,
      areas,
      city,
      contractMode,
      state,
      extra,
      workMode,
      actualRole,
      categories,
      tags,
      seniority,
      travel,
    }
  );

  return reply.send(serviceProvider);
};
