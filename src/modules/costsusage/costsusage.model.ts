import { FastifyRequest } from 'fastify';

export type CostsUsageBody = {
  type: string;
  amount: number;
};
export type BodyCostsUsage = {
  Body: CostsUsageBody;
};
export type CostsUsageType = FastifyRequest<BodyCostsUsage>;
