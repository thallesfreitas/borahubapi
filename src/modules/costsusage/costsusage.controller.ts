/* eslint-disable @typescript-eslint/naming-convention */
import { FastifyReply } from 'fastify';
import { CostsUsageType } from './costsusage.model';
import * as Service from './costsusage.service';

export const getCostsUsage = async (
  req: CostsUsageType,
  reply: FastifyReply
) => {
  const { type } = req.body;

  const credit = await Service.getCostsUsage(type);

  return reply.send(credit);
};

export const addCostsUsage = async (
  req: CostsUsageType,
  reply: FastifyReply
) => {
  const { type, amount } = req.body;
  const credit = await Service.addCostsUsage({
    type,
    amount,
  });

  return reply.send(credit);
};

export const removeCostsUsage = async (
  req: CostsUsageType,
  reply: FastifyReply
) => {
  const { type } = req.body;
  const credit = await Service.removeCostsUsage(type);

  return reply.send(credit);
};
