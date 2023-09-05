import * as ServiceProviderRepository from './serviceproviders.repository';

export const getServiceProviders = async (limit: number, skip: number) =>
  ServiceProviderRepository.getServiceProviders(limit, skip);

export const getServiceProviderById = async (id: number) =>
  ServiceProviderRepository.getServiceProviderById(id);

export const getServiceProvidersCount = () =>
  ServiceProviderRepository.getServiceProvidersCount();

export const getServiceProviderByUserId = (createdBy: number) =>
  ServiceProviderRepository.getServiceProviderByUserId(createdBy);

export const updateServiceProvider = async (
  userId: number,
  params: ServiceProviderRepository.UpdateServiceProviderArgs
) => ServiceProviderRepository.updateServiceProvider(userId, params);
