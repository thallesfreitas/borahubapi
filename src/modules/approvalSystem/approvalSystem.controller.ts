/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/naming-convention */
import { FastifyReply } from 'fastify';
import { GetModel } from './approvalSystem.model';
import * as ApprovalSystemService from './approvalSystem.service';

export const getApprovalSystem = async (req: GetModel, reply: FastifyReply) => {
  const { id } = req.body;
  const sentToGroups = await ApprovalSystemService.getApprovalSystemById(id);
  return reply.send(sentToGroups);
};
export const getApprovalSystemSocket = async (id: number) => {
  const sentToGroups = await ApprovalSystemService.getApprovalSystemById(id);
  return sentToGroups;
};
