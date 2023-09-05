/* eslint-disable @typescript-eslint/naming-convention */
import db from '../../lib/dbClient';
import { CreatePacks } from './packs.model';

export const getPacks = async () => {
  const packs = await db.packs.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      credits: 'asc',
    },
  });
  return packs;
};
export const getPack = async (type: string) => {
  const pack = await db.packs.findFirst({
    where: {
      type,
      isActive: true,
    },
  });
  return pack;
};

export const createPack = async (data: CreatePacks) => {
  const { type, name, unit_amount, features, phrases, credits } = data;

  const pack = await db.packs.create({
    data: {
      type,
      name,
      unit_amount,
      features,
      phrases,
      credits,
    },
  });

  return {
    pack,
  };
};
