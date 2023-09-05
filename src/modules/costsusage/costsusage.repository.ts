/* eslint-disable @typescript-eslint/naming-convention */
import db from '../../lib/dbClient';
import { CostsUsageBody } from './costsusage.model';

export const getCostsUsage = async (type: string) => {
  const costsusage = await db.costsUsage.findFirst({
    where: {
      type,
    },
  });
  return costsusage;
};

export const addCostsUsage = async (data: CostsUsageBody) => {
  const { type, amount } = data;

  const costsusage = await db.costsUsage.create({
    data: {
      type,
      amount,
    },
  });

  return {
    costsusage,
  };
};

export const removeCostsUsage = async (type: string) =>
  db.costsUsage.deleteMany({
    where: {
      type,
    },
  });
