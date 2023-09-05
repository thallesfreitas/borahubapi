/* eslint-disable @typescript-eslint/naming-convention */
import { FastifyReply } from 'fastify';
import { CreatePacksType, PacksType } from './packs.model';
import * as Service from './packs.service';

export const getPacks = async (req: PacksType, reply: FastifyReply) => {
  const packs = await Service.getPacks();
  return reply.send({ packs });
};

export const getPack = async (req: PacksType, reply: FastifyReply) => {
  const { type } = req.params;
  const pack = await Service.getPack(type);
  return reply.send(pack);
};

export const createPack = async (req: CreatePacksType, reply: FastifyReply) => {
  const { type, name, unit_amount, features, phrases, credits } = req.body;
  const pack = await Service.createPack({
    type,
    name,
    unit_amount,
    features,
    phrases,
    credits,
  });

  return reply.send(pack);
};
