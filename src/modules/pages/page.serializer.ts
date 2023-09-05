import { FastifyReply, FastifyRequest } from 'fastify';
import { PageObject } from './page.repository';

export const getPage = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any
) => {
  const page: PageObject = JSON.parse(payload);

  return JSON.stringify({
    status: 'success',
    data: page,
  });
};
