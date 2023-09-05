import { FastifyReply, FastifyRequest } from 'fastify';
import * as Webhook from './webhook.service';

export const webhookAPIGet = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  return Webhook.webhookAPIGet(request, reply);
};
export const webhookAPIpost = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  return Webhook.webhookAPIpost(request, reply);
};

export const webhook = async (request: FastifyRequest, reply: FastifyReply) => {
  return Webhook.webhook(request, reply);
};
