import { FastifyRequest } from 'fastify';

export interface SendMessage {
  name: string;
  email: string;
  companyName: string;
  comments: string;
  phone: string;
}

export type SendMessageRequest = FastifyRequest<{
  Body: SendMessage;
}>;
