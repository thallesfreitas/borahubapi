import { FastifyReply, FastifyRequest } from 'fastify';
import { SendMessageToGroupsType } from './whats.model';
import * as WhatsService from './whats.service';

export const connectWP = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const connect = await WhatsService.connectWP();
  return reply.send(connect);
};

export const getGroups = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const groups = await WhatsService.getGroups();

  return reply.send(groups);
};

export const sendMessageWithTemplate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const sendMessage = await WhatsService.sendMessageWithTemplate({
    ...(request.body as {}),
  } as WhatsService.SendMessageArgs);

  return reply.send(sendMessage);
};

export const sendMessageToGroups = async (
  request: SendMessageToGroupsType,
  reply: FastifyReply
) => {
  const { message, type, userId, idMessage, typeCost } = request.body;
  const sendMessage = await WhatsService.sendMessageToGroups(
    message,
    type,
    userId,
    idMessage,
    typeCost
  );

  return reply.send(sendMessage);
};
