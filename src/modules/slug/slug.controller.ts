import { FastifyReply } from 'fastify';
import { GetUserBySlug, UserQuery } from '../users/user.model';
import * as SlugService from './slug.service';

export const getBySlug = async (req: GetUserBySlug, reply: FastifyReply) => {
  const { slug } = req.params;
  const { userID } = req.query as UserQuery;
  const response = await SlugService.getBySlug(slug, userID as number);
  return reply.send(response);
};

export const verify = async (req: GetUserBySlug, reply: FastifyReply) => {
  const { slug } = req.params;
  const response = await SlugService.verify(slug);
  return reply.send(response);
};
export const generate = async (req: GetUserBySlug, reply: FastifyReply) => {
  const { slug } = req.params;
  const response = await SlugService.generate(slug);
  return reply.send({ slug: response });
};
