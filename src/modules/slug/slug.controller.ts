import { FastifyReply } from 'fastify';
import * as JobsService from '../jobs/jobs.service';
import { GetUserBySlug, UserQuery } from '../users/user.model';
import * as UserService from '../users/user.service';

export const getBySlug = async (req: GetUserBySlug, reply: FastifyReply) => {
  const { slug } = req.params;
  const { type } = req.query as UserQuery;

  const user = await UserService.getUserBySlug(slug);
  let response = null;

  if (user) {
    response = {
      type: 'user',
      data: user,
    };
  } else {
    const job = await JobsService.getJobBySlug(slug);
    response = {
      type: 'job',
      data: job,
    };
  }

  return reply.send(response);
};
