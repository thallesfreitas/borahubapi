import { FastifyRequest } from 'fastify';

export type Packs = {
  type: string;
};

export type Bodypacks = {
  Params: Packs;
};

export type PacksType = FastifyRequest<Bodypacks>;

export type CreatePacks = {
  type: string;
  name: string;
  unit_amount: number;
  features: string[];
  phrases: string;
  credits: number;
};

export type CreatePacksBody = {
  Body: CreatePacks;
};

export type CreatePacksType = FastifyRequest<CreatePacksBody>;
