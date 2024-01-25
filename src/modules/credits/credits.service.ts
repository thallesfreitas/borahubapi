import {
  ServiceArticleGetPriceAndAuthor,
  ServiceSetUserPaidArticle,
} from '../articles/articles.service';
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
export const getCostsUsage = async (type: string) => {
  return CostsUsageRepository.getCostsUsage(type);
};

export const verify = async ({
  userId,
  type,
  withRemove = true,
  id = 0,
}: VerifyCreditsType) => {
  console.log('verify - verifyCredit');
  console.log({
    userId,
    type,
    withRemove,
    id,
  });
  const credit = await getCreditsByCreditsId(userId);
  const amountCredit = credit?.amount as number;
  const costsusage = await CostsUsageRepository.getCostsUsage(type as string);

  let amountCost = 0;
  let author = null;

  switch (costsusage?.type) {
    case 'ARTICLE_VARIABLE':
      const { amountCostArticle, authorArticle } =
        await ServiceArticleGetPriceAndAuthor(id);
      amountCost = amountCostArticle;
      author = authorArticle;
      break;
    case 'EDUCATION_VARIABLE':
      // amountCost = await ServiceEducationGetPrice(id);
      break;
    default:
      amountCost = costsusage?.amount as number;
      break;
  }
  console.log('amountCost');
  console.log(amountCost);
  if (amountCredit < amountCost) {
    return false;
  }
  if (withRemove) {
    switch (costsusage?.type) {
      case 'ARTICLE_VARIABLE':
        await ServiceSetUserPaidArticle(userId, id);

        await addCredits({
          userId: author as number,
          amount: amountCost,
          transactionType: 'REMOVE_CREDITS',
          status: 'approved',
          type: costsusage?.type,
        });

        break;
      case 'EDUCATION_VARIABLE':
        // amountCost = await ServiceEducationGetPrice(id);
        break;
    }
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
