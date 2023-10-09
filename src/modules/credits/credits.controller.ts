/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/naming-convention */
import { FastifyReply } from 'fastify';

import {
  AddCredits,
  GetCredits,
  GetCreditsHistory,
  RemoveCredits,
  VerifyCredits,
} from './credits.model';
import * as CreditsService from './credits.service';

export const verify = async (req: VerifyCredits, reply: FastifyReply) => {
  const { userId, type } = req.body;
  const verifyStatus = CreditsService.verify({ userId, type });
  return reply.status(200).send(verifyStatus);
};
export const getCredits = async (req: GetCredits, reply: FastifyReply) => {
  const { userId } = req.body;

  const credit = await CreditsService.getCreditsByCreditsId(userId);

  return reply.send(credit);
};

export const getCreditsHistory = async (
  req: GetCreditsHistory,
  reply: FastifyReply
) => {
  const { creditId } = req.body;
  const credit = await CreditsService.getCreditsHistory({ creditId });
  return reply.send(credit);
};

export const addCredits = async (req: AddCredits, reply: FastifyReply) => {
  const { userId, amount, transactionType } = req.body;
  const credit = await CreditsService.addCredits({
    userId,
    amount,
    transactionType,
    status,
  });

  return reply.send(credit);
};

export const removeCredits = async (
  req: RemoveCredits,
  reply: FastifyReply
) => {
  const { userId, amount, type } = req.body;
  const credit = await CreditsService.removeCredits({
    userId,
    amount,
    type: type as string,
    status: 'approved',
  });

  return reply.send(credit);
};
