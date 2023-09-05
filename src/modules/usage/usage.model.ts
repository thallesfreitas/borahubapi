import { FastifyRequest } from 'fastify';

export type UsageBody = {
  userId: number;
  total?: number;
  input?: number;
  output?: number;
};
export type BodyUsage = {
  Body: UsageBody;
};
export type UsageType = FastifyRequest<BodyUsage>;
