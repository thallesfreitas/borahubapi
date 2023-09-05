import { FastifyReply, FastifyRequest } from 'fastify';
import * as ProductService from './page.service';

export const getPage = async (request: FastifyRequest, reply: FastifyReply) => {
  const { pageSlug } = request.params as { pageSlug: string };

  const page = await ProductService.getPage(pageSlug);
  reply.send(page);
};
