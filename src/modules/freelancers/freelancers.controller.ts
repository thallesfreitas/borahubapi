import { FastifyReply } from 'fastify';
import {
  GetFreelancersRequest,
  GetJobsByUserRequest,
  UpdateFreelancer,
} from './freelancers.model';
import * as FreelancersService from './freelancers.service';

export const getFreelancers = async (
  req: GetFreelancersRequest,
  reply: FastifyReply
) => {
  const { limit, skip } = req.query;

  const [freelancer, freelancerCount] = await Promise.all([
    FreelancersService.getFreelancers(limit, skip),
    FreelancersService.getFreelancersCount(),
  ]);
  return reply.send({
    count: freelancerCount,
    data: freelancer,
  });
};

export const getFreelancerByUserId = async (
  request: GetJobsByUserRequest,
  reply: FastifyReply
) => {
  const { userId } = request.query;
  const [freelancer] = await Promise.all([
    FreelancersService.getFreelancerByUserId(userId),
  ]);

  return reply.send({
    data: freelancer,
  });
};

export const updateFreelancer = async (
  req: UpdateFreelancer,
  reply: FastifyReply
) => {
  const {
    userId,
    description,
    avatar,
    banner,
    link,
    salary,
    areas,
    city,
    contractMode,
    state,
    extra,
    workMode,
    actualRole,
    categories,
    tags,
    seniority,
    travel,
  } = req.body;

  const freelancer = await FreelancersService.updateFreelancer(Number(userId), {
    description,
    avatar,
    banner,
    link,
    salary,
    areas,
    city,
    contractMode,
    state,
    extra,
    workMode,
    actualRole,
    categories,
    tags,
    seniority,
    travel,
  });

  return reply.send(freelancer);
};
