import { FastifyRequest } from 'fastify';

export type UpdateType = {
  id: number;
  groupId: number;
  status: boolean;
};
export type GetType = {
  id: number;
};

export type GetParams = {
  Body: GetType;
};
export type GetModel = FastifyRequest<GetParams>;
