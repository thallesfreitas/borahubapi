import { CreatePacks } from './packs.model';
import * as PacksRepository from './packs.repository';

export const getPacks = async () => PacksRepository.getPacks();

export const getPack = async (type: string) => PacksRepository.getPack(type);

export const createPack = async (data: CreatePacks) => {
  return PacksRepository.createPack(data);
};
