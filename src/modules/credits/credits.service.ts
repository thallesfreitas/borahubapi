import * as CostsUsageRepository from '../costsusage/costsusage.repository';
import {
  CreditsHistoryType,
  CreditsType,
  GetCreditsTransactionType,
  UpdateCreditsTransactionType,
  UpdateCreditsType,
  VerifyCreditsType,
} from './credits.model';
import * as CreditsRepository from './credits.repository';

export const getCreditsByCreditsId = async (userId: number) =>
  CreditsRepository.getCreditsById(userId);

export const getCreditsHistory = async (data: CreditsHistoryType) =>
  CreditsRepository.getCreditsHistory(data);

export const addCredits = async (data: CreditsType) => {
  return CreditsRepository.addCredits(data);
};

export const addCreditsTransaction = async (data: CreditsType) => {
  return CreditsRepository.addCreditsTransaction(data);
};

export const updateCreditsTransaction = async (
  data: UpdateCreditsTransactionType
) => {
  return CreditsRepository.updateCreditsTransaction(data);
};

export const getCreditsTransaction = async (
  data: GetCreditsTransactionType
) => {
  return CreditsRepository.getCreditsTransaction(data);
};

export const updateCredits = async (data: UpdateCreditsType) => {
  return CreditsRepository.updateCredits(data);
};

export const removeCredits = async (data: CreditsType) => {
  return CreditsRepository.removeCredits(data);
};

export const verify = async ({
  userId,
  type,
  withRemove = true,
}: VerifyCreditsType) => {
  const credit = await getCreditsByCreditsId(userId);
  const amountCredit = credit?.amount as number;
  const costsusage = await CostsUsageRepository.getCostsUsage(type as string);
  const amountCost = costsusage?.amount as number;

  if (amountCredit < amountCost) {
    return false;
  }
  if (withRemove) {
    await CreditsRepository.removeCredits({
      userId,
      amount: amountCost,
      transactionType: 'REMOVE_CREDITS',
      status: 'approved',
      type: costsusage?.type,
    });
  }
  return true;
};
