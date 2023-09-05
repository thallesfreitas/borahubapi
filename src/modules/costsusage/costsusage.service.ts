import { CostsUsageBody } from './costsusage.model';
import * as CostsUsageRepository from './costsusage.repository';

export const getCostsUsage = async (type: string) =>
  CostsUsageRepository.getCostsUsage(type);

export const addCostsUsage = async (data: CostsUsageBody) => {
  return CostsUsageRepository.addCostsUsage(data);
};

export const removeCostsUsage = async (type: string) => {
  return CostsUsageRepository.removeCostsUsage(type);
};
