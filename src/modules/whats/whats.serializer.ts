import { FastifyReply, FastifyRequest } from 'fastify';

export const message = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any
) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ...message
  }: any = payload;

  const newPayload = {
    ...message,
  };

  return newPayload;
};
