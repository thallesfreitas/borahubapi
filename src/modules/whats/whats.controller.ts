import { FastifyReply, FastifyRequest } from 'fastify';
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
export const sendMessageWhats = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const sendMessage = await WhatsService.sendMessageWhats({
    ...(request.body as {}),
  } as WhatsService.SendMessageArgs);

  return reply.send(sendMessage);
};
