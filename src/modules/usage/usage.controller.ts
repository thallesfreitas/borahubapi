/* eslint-disable @typescript-eslint/naming-convention */
import { FastifyReply } from 'fastify';
import { UsageType } from './usage.model';
import * as Service from './usage.service';

export const getUsage = async (req: UsageType, reply: FastifyReply) => {
  const { userId } = req.body;

  const credit = await Service.getUsage(userId);

  return reply.send(credit);
};

export const addUsage = async (req: UsageType, reply: FastifyReply) => {
  const { userId, total, input, output } = req.body;
  const credit = await Service.addUsage({
    userId,
    total,
    input,
    output,
  });

  return reply.send(credit);
};
