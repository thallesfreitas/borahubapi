import {
  CreditsHistoryType,
  CreditsType,
  GetCreditsTransactionType,
  RemoveCreditsType,
  UpdateCreditsTransactionType,
  UpdateCreditsType,
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

export const removeCredits = async (data: RemoveCreditsType) => {
  return CreditsRepository.removeCredits(data);
};
