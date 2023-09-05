/* eslint-disable @typescript-eslint/no-unused-vars */
import fastify from 'fastify';
import { FastifyReplyType } from 'fastify/types/type-provider';

declare module 'fastify' {
  export interface FastifyInstance<> {
    authenticate(request: FastifyRequest, reply: FastifyReplyType): void;
    userInformation(): void;
  }
  export interface FastifyRequest<> {
    user: {
      id: number;
      email: string;
      name: string;
    };
    orderId?: number;
  }
}
