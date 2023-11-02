import { FastifyReply } from 'fastify';
import {
  GetCandidatesRequest,
  GetJobsByUserRequest,
  UpdateCandidate,
} from './candidate.model';
import * as CandidateService from './candidate.service';

export const getCandidates = async (
  req: GetCandidatesRequest,
  reply: FastifyReply
) => {
  const { limit, skip } = req.query;

  const [candidates, candidatesCount] = await Promise.all([
    CandidateService.getCandidates(limit, skip),
    CandidateService.getCandidatesCount(),
  ]);
  return reply.send({
    count: candidatesCount,
    data: candidates,
  });
};

export const getCandidateByUserId = async (
  request: GetJobsByUserRequest,
  reply: FastifyReply
) => {
  const { userId } = request.query;
  const [candidate] = await Promise.all([
    CandidateService.getCandidateByUserId(userId),
  ]);

  return reply.send({
    data: candidate,
  });
};

export const updateCandidate = async (
  req: UpdateCandidate,
  reply: FastifyReply
) => {
  const {
    userId,
    description,
    avatar,
    banner,
    link,
    actualRole,
    city,
    state,
    extra,
    salary,
    contractMode,
    workMode,
    seniority,
    travel,
    affirmative,
    areas,
    categories,
    tags,
  } = req.body;

  const candidate = await CandidateService.updateCandidate(Number(userId), {
    description,
    avatar,
    banner,
    link,
    actualRole,
    city,
    state,
    extra,
    salary,
    contractMode,
    workMode,
    seniority,
    travel,
    affirmative,
    areas,
    categories,
    tags,
  });

  return reply.send(candidate);
};
