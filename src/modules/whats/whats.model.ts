import { FastifyRequest } from 'fastify';

export type SendMessageToGroupsBody = {
  message: string;
  type: string;
  userId: number;
  idMessage: number;
  typeCost: string;
};
export type BodysendMessageToGroups = {
  Body: SendMessageToGroupsBody;
};
export type SendMessageToGroupsType = FastifyRequest<BodysendMessageToGroups>;
