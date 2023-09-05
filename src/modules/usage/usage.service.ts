import { UsageBody } from './usage.model';
import * as UsageRepository from './usage.repository';

export const getUsage = async (userId: number) =>
  UsageRepository.getUsage(userId);

export const addUsage = async (data: UsageBody) => {
  return UsageRepository.addUsage(data);
};
